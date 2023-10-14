package docker.tasks

import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

abstract class CreateDockerComposeFileTask : DefaultTask() {

    @get:OutputDirectory
    abstract val directory: DirectoryProperty

    @get:Input
    abstract val rawDockerComposeText: Property<String>

    @get:Input
    abstract val tag: Property<String>

    private val old = "${project.name}:${project.version}"

    init {
        tag.convention(old)
    }

    @TaskAction
    fun create() {
        val t = tag.getOrElse(old)
        val text = rawDockerComposeText.get().replace(old, t)
        println("new text: $text")
        directory.file("docker-compose.yml").get().asFile.writeText(text)
    }
}