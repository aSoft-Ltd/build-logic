package dockeris.tooling

import dockeris.DockerisContext
import dockeris.images.DockerisImageTemplateBuilder.DependencyFile
import org.gradle.api.DefaultTask
import org.gradle.api.Project
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.OutputFile
import org.gradle.api.tasks.TaskAction
import org.gradle.api.tasks.TaskProvider
import org.gradle.configurationcache.extensions.capitalized
import utils.taskify

abstract class CreateTextFileTask : DefaultTask() {

    @get:OutputFile
    abstract val destination: RegularFileProperty

    @get:Input
    abstract val content: Property<String>

    @TaskAction
    fun create() {
        destination.get().asFile.writeText(content.get())
    }

    companion object {
        internal fun register(
            project: Project,
            dependency: DependencyFile,
            context: DockerisContext,
        ): TaskProvider<CreateTextFileTask> {
            val env = context.environment
            val owner = context.owner
            val task = "createDockeris${dependency.name.capitalized()}DependencyFileFor${owner.capitalized()}${env}Environment".taskify()
            return project.tasks.register(task, CreateTextFileTask::class.java)
        }
    }
}