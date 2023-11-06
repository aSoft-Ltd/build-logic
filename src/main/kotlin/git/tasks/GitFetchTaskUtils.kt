package git.tasks

import java.io.File
import org.gradle.api.Project
import org.gradle.kotlin.dsl.register

fun Project.gitFetch(modules: Array<out File>) {
    val branch = providers.gradleProperty("from")

    tasks.register<GitFetchTask>("gitFetch") {
        this.modules.set(modules.toList())
        from.set(branch)
        destination.set(layout.buildDirectory.dir("git/fetch"))
    }
}