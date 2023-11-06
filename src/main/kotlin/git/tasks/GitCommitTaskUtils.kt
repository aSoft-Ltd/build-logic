package git.tasks

import java.io.File
import org.gradle.api.Project
import org.gradle.kotlin.dsl.register

fun Project.gitCommit(modules: Array<out File>) {
    val message = providers.gradleProperty("message")

    tasks.register<GitCommitTask>("gitCommit") {
        this.modules.set(modules.toList())
        this.message.set(message)
        destination.set(layout.buildDirectory.dir("git/fetch"))
    }
}