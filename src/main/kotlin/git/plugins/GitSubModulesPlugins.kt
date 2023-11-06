package git.plugins

import git.tasks.gitAdd
import git.tasks.gitCommit
import git.tasks.gitStatus
import java.io.File
import org.gradle.api.Plugin
import org.gradle.api.Project

class GitSubModulesPlugins : Plugin<Project> {
    override fun apply(target: Project) = with(target) {
        val modules = submodules()
        gitStatus(modules)
        gitAdd(modules)
        gitCommit(modules)
    }

    fun Project.submodules() = layout.projectDirectory.asFile.listFiles { file ->
        file.isDirectory && File(file, ".git").exists()
    } ?: emptyArray()
}