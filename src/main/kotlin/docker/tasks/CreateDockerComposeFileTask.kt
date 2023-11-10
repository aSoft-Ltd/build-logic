package docker.tasks

import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.MapProperty
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

abstract class CreateDockerComposeFileTask : DefaultTask() {

    @get:OutputDirectory
    abstract val directory: DirectoryProperty

    @get:Input
    abstract val content: Property<String>

    @get:Input
    abstract val tags: MapProperty<String, String>

    @TaskAction
    fun create() {
        var text = content.get()
        tags.get().forEach { (old, new) -> text = text.replace(old, new) }
        directory.file("docker-compose.yml").get().asFile.writeText(text)
    }
}