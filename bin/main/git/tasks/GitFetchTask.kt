package git.tasks

import git.models.GitProcess
import java.io.File
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input

abstract class GitFetchTask : GitModuleTask() {

    @get:Input
    abstract val from: Property<String>

    init {
        git("fetch", "origin", from)
    }

    override fun onStart(workdir: File) {
        val text = buildString {
            appendLine("Workdir: $workdir")
            appendLine("Fetching: ${from.get()}")
            appendLine("Status: 🔵 Started")
        }
        println(text)
    }

    override fun onFinished(workdir: File) {
        val text = buildString {
            appendLine("Workdir: $workdir")
            appendLine("Fetching: ${from.get()}")
            appendLine("Status: 🟢 Finished")
        }
        println(text)
    }
    override fun finish(processes: List<GitProcess>) = Unit
}