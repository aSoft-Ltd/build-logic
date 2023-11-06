package git.tasks

import docker.taskify
import git.models.GitExecution
import java.io.ByteArrayOutputStream
import java.io.File
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import org.gradle.kotlin.dsl.register

fun Project.gitCommit(modules: Array<out File>) {
    val message = providers.gradleProperty("message")
    val individual = modules.map {
        val os = ByteArrayOutputStream()
        GitExecution(
            task = tasks.register<Exec>("gitCommit${it.name.taskify()}") {
                workingDir(it)
                setStandardOutput(os)
                setIgnoreExitValue(true)
                commandLine("git", "commit", "-m", """"${message.get()}"""")
            },
            root = it,
            output = os
        )
    }

    val os = ByteArrayOutputStream()
    tasks.register<Exec>("gitCommit") {
        dependsOn(individual.map { it.task })
        setStandardOutput(os)
        setIgnoreExitValue(true)
        commandLine("git", "commit", "-m", """"${message.get()}"""")

        doLast {
            val out = buildString {
                val splitter = "=".repeat(200)
                individual.forEach {
                    val str = it.output.toString(Charsets.UTF_8)
                    if (!str.contains("nothing to commit")) {
                        appendLine(splitter)
                        appendLine(it.root.absolutePath)
                        appendLine(splitter)
                        appendLine(str)
                    }
                }
                appendLine(os.toString(Charsets.UTF_8))
            }
            println(out)
        }
    }
}