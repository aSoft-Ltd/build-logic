package git.plugins

import git.tasks.GitAddTask
import git.tasks.GitCommitTask
import git.tasks.GitFetchTask
import git.tasks.GitMergeTask
import git.tasks.GitStatusTask
import java.io.File
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.register

class GitSubModulesPlugins : Plugin<Project> {
    override fun apply(target: Project) = with(target) {
        val mods = submodules()
        val build = layout.buildDirectory
        tasks.register<GitStatusTask>("gitStatus") {
            modules.set(mods)
            destination.set(build.dir("git/status"))
        }
        tasks.register<GitAddTask>("gitAdd") {
            modules.set(mods)
            destination.set(build.dir("git/add"))
        }
        tasks.register<GitCommitTask>("gitCommit") {
            mustRunAfter("gitAdd")
            modules.set(mods)
            message.set(providers.gradleProperty("message"))
            destination.set(layout.buildDirectory.dir("git/commit"))
        }
        tasks.register<GitFetchTask>("gitFetch") {
            modules.set(mods)
            from.set(providers.gradleProperty("from"))
            destination.set(layout.buildDirectory.dir("git/fetch"))
        }
        tasks.register<GitMergeTask>("gitMerge") {
            modules.set(mods)
            from.set(providers.gradleProperty("from"))
            destination.set(layout.buildDirectory.dir("git/fetch"))
        }
        Unit
    }

    fun Project.submodules() = buildList{
        val root = layout.projectDirectory
        val subs = root.asFile.listFiles { file ->
            file.isDirectory && File(file, ".git").exists()
        }
        addAll(subs.toList())
        add(root.asFile)
    }
}