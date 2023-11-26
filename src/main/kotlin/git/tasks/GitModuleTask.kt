package git.tasks

import git.models.GitProcess
import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.ListProperty
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

    private val gitProvider: Provider<String> = project.provider { "git" }

    fun git(vararg args: Any) {
        command.add(gitProvider)
        addCommand(*args)
    }

    @get:Input
    protected val trailCommand = mutableSetOf<String>()
    protected fun addCommand(vararg args: Any) {
        args.map { arg ->
            when (arg) {
                is String -> command.add(gitProvider.map { arg })
                is Provider<*> -> command.add(arg as Provider<String>)
                else -> throw IllegalArgumentException("Unsupported git sub command $arg")
            }
        }
    }

    @TaskAction
    fun execute() {
        val processes = modules.get().map { module ->
            val out = destination.file("${module.name}.out.txt").get().asFile
            val err = destination.file("${module.name}.err.txt").get().asFile
            onStart(module)
            val cmd = command.get().map { it.get() } + trailCommand
            GitProcess(
                workdir = module,
                process = ProcessBuilder(cmd).apply {
                    directory(module)
                    redirectOutput(out)
                    redirectError(destination.file("${module.name}.err.txt").get().asFile)
                }.start(),
                out = out,
                err = err
            )
        }

        postExecute(processes)

        finish(processes)
    }

    open fun onStart(workdir: File) {}

    open fun onFinished(workdir: File) {}
    open fun postExecute(processes: List<GitProcess>) {
        val fails = processes.filter {
            it.process.waitFor()
            onFinished(it.workdir)
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