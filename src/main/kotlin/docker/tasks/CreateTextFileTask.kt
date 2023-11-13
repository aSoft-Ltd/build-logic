package docker.tasks

import org.gradle.api.DefaultTask
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.provider.ListProperty
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.OutputFile
import org.gradle.api.tasks.TaskAction

abstract class CreateTextFileTask : DefaultTask() {
    @get:OutputFile
    abstract val output: RegularFileProperty

    @get:Input
    abstract val content: ListProperty<String>

    init {
        group = "Dockate Create"
    }

    @TaskAction
    fun create() {
        output.get().asFile.writeText(content.get().joinToString("\n"))
    }
}