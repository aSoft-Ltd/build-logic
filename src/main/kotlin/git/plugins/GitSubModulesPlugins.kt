package git.plugins

import git.tasks.GitAddTask
import git.tasks.GitCommitTask
import git.tasks.GitFetchTask
import git.tasks.GitMergeTask
import git.tasks.GitPushTask
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
        val add = tasks.register<GitAddTask>("gitAdd") {
            modules.set(mods)
            destination.set(build.dir("git/add"))
        }
        val commit = tasks.register<GitCommitTask>("gitCommit") {
            dependsOn(add)
            modules.set(mods)
            message.set(providers.gradleProperty("message"))
            destination.set(build.dir("git/commit"))
        }
        val fetch = tasks.register<GitFetchTask>("gitFetch") {
            mustRunAfter(add, commit)
            modules.set(mods)
            from.set(providers.gradleProperty("from"))
            destination.set(build.dir("git/fetch"))
        }
        val merge = tasks.register<GitMergeTask>("gitMerge") {
            dependsOn(fetch)
            modules.set(mods)
            from.set(providers.gradleProperty("from"))
            destination.set(build.dir("git/merge"))
        }
        tasks.register<GitPushTask>("gitPush") {
            mustRunAfter(merge)
            modules.set(mods)
            src.set(providers.gradleProperty("src"))
            dst.set(providers.gradleProperty("dst"))
            destination.set(build.dir("git/push"))
        }
        Unit
    }

    private fun Project.submodules() = buildList {
        val root = layout.projectDirectory
        root.asFile.listFiles { file ->
            file.isDirectory && File(file, ".git").exists()
        }?.toList()?.let { addAll(it) }
        add(root.asFile)
    }
}