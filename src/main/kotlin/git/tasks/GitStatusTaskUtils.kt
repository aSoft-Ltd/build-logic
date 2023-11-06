package git.tasks

import java.io.File
import org.gradle.api.Project
import org.gradle.kotlin.dsl.register

fun Project.gitStatus(modules: Array<out File>) {
    tasks.register<GitStatusTask>("gitStatus") {
        this.modules.set(modules.toList())
        destination.set(layout.buildDirectory.dir("git/status"))
    }
}