package git.tasks

import git.models.GitProcess
import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.ListProperty
import org.gradle.api.tasks.InputFiles
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

abstract class GitStatusTask : GitModuleTask() {

    init {
        git("status")
    }

    override fun finish(processes: List<GitProcess>) {
        var allClean = true
        processes.forEach {
            val outText = it.out.readText()
            val errText = it.err.readText()
            if (!outText.contains("nothing to commit")) {
                allClean = false
                println(it.workdir.absolutePath)
                println(outText)
            }
            if (errText.isNotBlank()) {
                allClean = false
                println(it.workdir.absolutePath)
                System.err.println(errText)
            }
        }
        if (allClean) {
            println("root module and all its submodules are fully committed")
        }
    }
}