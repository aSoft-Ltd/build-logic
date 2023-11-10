package git.tasks

import git.models.GitProcess
import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.ListProperty
import org.gradle.api.provider.Property
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.InputFiles
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

abstract class GitModuleTask : DefaultTask() {
    @get:InputFiles
    abstract val modules: ListProperty<File>

    @get:OutputDirectory
    abstract val destination: DirectoryProperty


    @get:Input
    abstract val command: ListProperty<Provider<String>>

    fun git(vararg args: Any) {
        command.add(project.provider { "git" })
        args.map {
            when (it) {
                is String -> command.add(project.provider { it })
                is Provider<*> -> command.add(it as Provider<String>)
                else -> throw IllegalArgumentException("Unsupported git sub command $it")
            }
        }
    }

    @TaskAction
    fun execute() {
        val cmd = command.get().map { it.get() }
        val processes = modules.get().map { module ->
            val out = destination.file("${module.name}.out.txt").get().asFile
            val err = destination.file("${module.name}.err.txt").get().asFile
            GitProcess(
                workdir = module,
                process = ProcessBuilder(cmd).apply {
                    directory(module)
                    redirectOutput(out)
                    redirectError(destination.file("${module.name}.err.txt").get().asFile)
                }.start(),
                out = out,
                err = err
            ).also { onStart(it) }
        }

        postExecute(processes)

        finish(processes)
    }

    open fun onStart(process: GitProcess) {}

    open fun onFinished(process: GitProcess){}
    open fun postExecute(processes: List<GitProcess>) {
        val fails = processes.filter {
            it.process.waitFor()
            onFinished(it)
            it.process.exitValue() != 0
        }

        val err = buildString {
            fails.forEach {
                appendLine(it.workdir.absolutePath)
                appendLine(it.err.readText())
            }
        }

        if (fails.isNotEmpty()) {
            System.err.println(err)
            throw RuntimeException(err)
        }
    }

    abstract fun finish(processes: List<GitProcess>)
}