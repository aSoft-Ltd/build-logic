package git.tasks

import java.io.File
import org.gradle.api.Project
import org.gradle.kotlin.dsl.register

fun Project.gitAdd(modules: Array<out File>) {
    tasks.register<GitAddTask>("gitAdd") {
        this.modules.set(modules.toList())
        destination.set(layout.buildDirectory.dir("git/add"))
    }
}