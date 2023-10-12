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

    @TaskAction
    fun create() {
        directory.file("docker-compose.yml").get().asFile.writeText(rawDockerComposeText.get())
    }
}