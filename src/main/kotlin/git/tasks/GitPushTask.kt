package git.tasks

import git.models.GitProcess
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input

abstract class GitPushTask : GitModuleTask() {

    @get:Input
    abstract val src: Property<String>

    @get:Input
    abstract val dst: Property<String>

    init {
        git("push", "origin", src.flatMap { s -> dst.map { d -> "$s:$d" } })
    }

    override fun onStart(process: GitProcess) {
        val text = buildString {
            appendLine("Workdir: ${process.workdir}")
            appendLine("Pushing: ${src.get()} --> ${dst.get()}")
            appendLine("Status: 🔵 Started")
        }
        println(text)
    }

    override fun onFinished(process: GitProcess) {
        val text = buildString {
            appendLine("Workdir: ${process.workdir}")
            appendLine("Pushing: ${src.get()} --> ${dst.get()}")
            appendLine("Status: ✅ Finished")
        }
        println(text)
    }

    override fun finish(processes: List<GitProcess>) = processes.forEach {
        val outText = it.out.readText()
        val errText = it.err.readText()
        if (!outText.contains("Everything up-to-date") && outText.isNotBlank()) {
            println(it.workdir.absolutePath)
            println(outText)
        }
        if (!errText.contains("Everything up-to-date") && errText.isNotBlank()) {
            println(it.workdir.absolutePath)
            System.err.println(errText)
        }
    }
}