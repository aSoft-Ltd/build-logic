package git.tasks

import docker.taskify
import git.models.GitExec
import java.io.ByteArrayOutputStream
import java.io.File
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import org.gradle.kotlin.dsl.register

fun Project.gitCommit(modules: Array<out File>) {
    val message = providers.gradleProperty("message")
    val individual = modules.map {
        val os = ByteArrayOutputStream()
        GitExec(
            task = tasks.register<Exec>("gitCommit${it.name.taskify()}") {
                workingDir(it)
//                setStandardOutput(os)
                commandLine("git", "commit", "-m", message.get())
                commandLine("echo", message.get())
            },
            root = it,
            output = os
        )
    }

    val os = ByteArrayOutputStream()
    tasks.register<Exec>("gitCommit") {
        dependsOn(individual.map { it.task })
//        setStandardOutput(os)
        commandLine("git", "commit", "-m", message.get())

        doLast {
            val out = buildString {
                val splitter = "=".repeat(200)
                individual.forEach {
                    val str = it.output.toString(Charsets.UTF_8)
                    if (str != message.get()) {
                        appendLine(splitter)
                        appendLine(it.root.absolutePath)
                        appendLine(splitter)
                        appendLine(str)
                        appendLine(splitter)
                    }
                }
                appendLine(os.toString(Charsets.UTF_8))
            }
            println(out)
        }
    }
}