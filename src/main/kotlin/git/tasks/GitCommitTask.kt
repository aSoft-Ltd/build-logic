package git.tasks

import git.models.GitProcess
import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.ListProperty
import org.gradle.api.tasks.InputFiles
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

abstract class GitCommitTask : GitModuleTask() {

    init {
        git("add", ".")
    }

    override fun finish(processes: List<GitProcess>) {
        println("Added")
    }
}