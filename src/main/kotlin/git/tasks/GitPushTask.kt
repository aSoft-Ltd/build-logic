package git.tasks

import git.models.GitProcess
import java.io.File
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input

abstract class GitPushTask : GitModuleTask() {

    @get:Input
    abstract val src: Property<String>

    @get:Input
    abstract val dst: Property<String>

    private val destinations by lazy { dst.get().split(",") }
    private val source by lazy { src.get() }

    private val mappings by lazy { destinations.map { "$source:$it" } }

    init {
        git(*(arrayOf("push", "origin") + mappings))
//        git("push", "origin", src.flatMap { s -> dst.map { d -> "$s:$d" } })
    }

    override fun onStart(workdir: File) {
        val text = buildString {
            appendLine("Workdir: $workdir")
            mappings.forEach {
                appendLine("Pushing: ${it.replace(":", "--->")}")
            }
            appendLine("Status: 🔵 Started")
        }
        println(text)
    }

    override fun onFinished(workdir: File) {
        val text = buildString {
            appendLine("Workdir: $workdir")
            mappings.forEach {
                appendLine("Pushing: ${it.replace(":", "--->")}")
            }
            appendLine("Status: 🟢 Finished")
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