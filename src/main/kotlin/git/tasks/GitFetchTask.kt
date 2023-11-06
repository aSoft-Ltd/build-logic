package git.tasks

import git.models.GitProcess
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input

abstract class GitFetchTask : GitModuleTask() {

    @get:Input
    abstract val from: Property<String>

    init {
        git("fetch", "origin", from)
    }

    override fun finish(processes: List<GitProcess>) = processes.forEach {
        System.err.println(it.err.readText())
        System.out.println(it.out.readText())
    }
}