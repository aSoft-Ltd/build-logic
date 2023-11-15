package git.tasks

import git.models.GitProcess
import java.io.File
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input

abstract class GitMergeTask : GitModuleTask() {

    @get:Input
    abstract val from: Property<String>

    init {
        git("merge", from.map { "origin/$it" })
    }

    override fun onStart(workdir: File) {
        val text = buildString {
            appendLine("Workdir: $workdir")
            appendLine("Merging: ${from.get()}")
            appendLine("Status: 🔵 Started")
        }
        println(text)
    }

    override fun onFinished(workdir: File) {
        val text = buildString {
            appendLine("Workdir: $workdir")
            appendLine("Merging: ${from.get()}")
            appendLine("Status: 🟢 Finished")
        }
        println(text)
    }

    override fun finish(processes: List<GitProcess>) = processes.forEach {
        val outText = it.out.readText()
        val errText = it.err.readText()
        if (!outText.contains("Already up to date") && outText.isNotBlank()) {
            println(it.workdir.absolutePath)
            println(outText)
        }
        if (errText.isNotBlank()) {
            println(it.workdir.absolutePath)
            System.err.println(errText)
        }
    }
}