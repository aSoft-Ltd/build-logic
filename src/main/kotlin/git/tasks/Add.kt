package git.tasks

import docker.taskify
import git.models.GitExec
import java.io.ByteArrayOutputStream
import java.io.File
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import org.gradle.kotlin.dsl.register

fun Project.gitAdd(modules: Array<out File>) {
    val individual = modules.map {
        tasks.register<Exec>("gitAdd${it.name.taskify()}") {
            workingDir(it)
            commandLine("git", "add", ".")
        }
    }

    tasks.register<Exec>("gitAdd") {
        dependsOn(individual)
        commandLine("git", "add", ".")
    }
}