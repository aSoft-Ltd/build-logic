package dockate.tasks

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
    abstract val content: Property<String>

    init {
        group = "Dockate Create"
    }
    @TaskAction
    fun create() {
        directory.file("Dockerfile").get().asFile.writeText(content.get())
    }
}