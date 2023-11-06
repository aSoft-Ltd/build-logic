package git.tasks

import git.models.GitProcess
import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.ListProperty
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.InputFiles
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

abstract class GitCommitTask : GitModuleTask() {

    @get:Input
    abstract val message: Property<String>

    init {
        git("commit", "-m", message)
    }

    override fun finish(processes: List<GitProcess>) = processes.forEach {
        val outText = it.out.readText()
        if (!outText.contains("nothing to commit") && outText.isNotBlank()) {
            println(it.workdir.absolutePath)
            println(outText)
        }
    }

    override fun postExecute(processes: List<GitProcess>) {

    }
}