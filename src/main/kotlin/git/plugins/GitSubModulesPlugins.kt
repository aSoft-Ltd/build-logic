package git.plugins

import docker.taskify
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
        val root = listOf(mods.last())
        val submodules = mods - root
        val build = layout.buildDirectory
        tasks.register<GitStatusTask>("gitStatus") {
            modules.set(mods)
            destination.set(build.dir("git/status"))
        }

        val adds = submodules.map {
            tasks.register<GitAddTask>("gitAdd${it.name.taskify()}") {
                modules.set(listOf(it))
                destination.set(build.dir("git/add"))
            }
        }

        val addSubmodules = tasks.register("gitAddSubModules") {
            dependsOn(adds)
        }

        val commits = submodules.map {
            tasks.register<GitCommitTask>("gitCommit${it.name.taskify()}") {
                dependsOn("gitAdd${it.name.taskify()}")
                modules.set(listOf(it))
                message.set(providers.gradleProperty("message"))
                destination.set(build.dir("git/commit"))
            }
        }

        val commitSubmodules = tasks.register("gitCommitSubModules") {
            dependsOn(commits)
        }

        val addRoot = tasks.register<GitAddTask>("gitAddRoot") {
            mustRunAfter(commitSubmodules)
            modules.set(root)
            destination.set(build.dir("git/add"))
        }

        val commitRoot = tasks.register<GitCommitTask>("gitCommitRoot") {
            dependsOn(addRoot, commitSubmodules)
            modules.set(root)
            message.set(providers.gradleProperty("message"))
            destination.set(build.dir("git/commit"))
        }

        tasks.register("gitCommit") {
            dependsOn(commitSubmodules, commitRoot)
        }

        val fetchs = submodules.map {
            tasks.register<GitFetchTask>("gitFetch${it.name.taskify()}") {
                mustRunAfter("gitAdd${it.name.taskify()}", "gitCommit${it.name.taskify()}", commitRoot)
                modules.set(listOf(it))
                from.set(providers.gradleProperty("from"))
                destination.set(build.dir("git/fetch"))
            }
        }

        val fetch = tasks.register<GitFetchTask>("gitFetch") {
            dependsOn(fetchs)
            modules.set(root)
            from.set(providers.gradleProperty("from"))
            destination.set(build.dir("git/fetch"))
        }

        val merges = submodules.map {
            tasks.register<GitMergeTask>("gitMerge${it.name.taskify()}") {
                dependsOn("gitFetch${it.name.taskify()}", fetch)
                modules.set(listOf(it))
                from.set(providers.gradleProperty("from"))
                destination.set(build.dir("git/merge"))
            }
        }

        val merge = tasks.register<GitMergeTask>("gitMerge") {
            dependsOn(fetch, merges)
            modules.set(root)
            from.set(providers.gradleProperty("from"))
            destination.set(build.dir("git/merge"))
        }

        val pushs = submodules.map {
            tasks.register<GitPushTask>("gitPush${it.name.taskify()}") {
                mustRunAfter("gitMerge${it.name.taskify()}", merge)
                modules.set(listOf(it))
                src.set(providers.gradleProperty("src"))
                dst.set(providers.gradleProperty("dst"))
                destination.set(build.dir("git/push"))
            }
        }
        tasks.register<GitPushTask>("gitPush") {
            dependsOn(pushs, merge)
            modules.set(root)
            src.set(providers.gradleProperty("src"))
            dst.set(providers.gradleProperty("dst"))
            destination.set(build.dir("git/push"))
        }
        Unit
    }

    fun applyOld(target: Project) = with(target) {
        val mods = submodules()
        val root = listOf(mods.last())
        val submodules = mods - root
        val build = layout.buildDirectory
        tasks.register<GitStatusTask>("gitStatus") {
            modules.set(mods)
            destination.set(build.dir("git/status"))
        }

        val addSubmodules = tasks.register<GitAddTask>("gitAddSubModules") {
            modules.set(submodules)
            destination.set(build.dir("git/add"))
        }

        val commitSubmodules = tasks.register<GitCommitTask>("gitCommitSubModules") {
            dependsOn(addSubmodules)
            modules.set(mods)
            message.set(providers.gradleProperty("message"))
            destination.set(build.dir("git/commit"))
        }

        val addRoot = tasks.register<GitAddTask>("gitAddRoot") {
            mustRunAfter(commitSubmodules)
            modules.set(root)
            destination.set(build.dir("git/add"))
        }

        val commitRoot = tasks.register<GitCommitTask>("gitCommitRoot") {
            dependsOn(addRoot, commitSubmodules)
            modules.set(root)
            message.set(providers.gradleProperty("message"))
            destination.set(build.dir("git/commit"))
        }

        tasks.register("gitCommit") {
            dependsOn(commitSubmodules, commitRoot)
        }

        val fetch = tasks.register<GitFetchTask>("gitFetch") {
            mustRunAfter(addSubmodules, commitSubmodules, commitRoot)
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