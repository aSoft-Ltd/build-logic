package docker.builders

import docker.models.RunningEnvironment
import docker.models.TextFile
import docker.taskify
import docker.tasks.CreateTextFileTask
import org.gradle.api.Project
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.tasks.Delete
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register

class RunningEnvironmentBuilder {
    private val files = mutableMapOf<String, String>()
    fun file(path: String, content: StringBuilder.() -> Unit) {
        files[path] = StringBuilder().apply(content).toString()
    }

    internal fun Project.build(name: String, output: DirectoryProperty): RunningEnvironment {
        val fs = files.map { (path, content) ->
            val taskName = "${path.taskify()}${name.capitalized()}TextFile"
            val location = output.file("${name.lowercase()}$path")
            val create = tasks.register<CreateTextFileTask>("create$taskName") {
                this.output.set(location)
                this.content.set(content)
            }

            val remove = tasks.register<Delete>("remove$taskName") {
                delete(location)
            }
            TextFile(path, content, create, remove)
        }
        val taskName = "${name.capitalized()}TextFiles"
        tasks.register("create$taskName") {
            for (f in fs) dependsOn(f.create)
        }

        tasks.register("remove$taskName") {
            for (f in fs) dependsOn(f.remove)
        }
        return RunningEnvironment(name, DockerComposeFileBuilder(name), fs)
    }

    fun StringBuilder.logging(level: String, configuration: StringBuilder.() -> Unit) {
        appendLine("""[logging]""")
        appendLine("""level = "$level"""")
        appendLine()
        configuration()
    }

    fun StringBuilder.console(format: String) {
        appendLine("""[[logging.appenders]]""")
        appendLine("""type = "console"""")
        appendLine("""formatter.type = "$format"""")
    }
}