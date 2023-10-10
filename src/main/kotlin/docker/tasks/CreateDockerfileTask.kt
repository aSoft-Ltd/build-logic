package docker.tasks

import docker.DockerfileBuilder
import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

abstract class CreateDockerfileTask : DefaultTask() {

    @get:OutputDirectory
    abstract val directory: DirectoryProperty

    @get:Input
    abstract val rawDockerText: Property<String>

    @TaskAction
    fun create() {
        directory.file("Dockerfile").get().asFile.writeText(rawDockerText.get())
//        File(directory.get(), "Dockerfile").apply {
//            if (!exists()) createNewFile()
//        }.apply {
//            val text = DockerfileBuilder().apply(builder).text.toString()
//            writeText(text)
//        }
    }
}