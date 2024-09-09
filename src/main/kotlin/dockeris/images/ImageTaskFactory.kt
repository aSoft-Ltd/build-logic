package dockeris.images

import dockeris.DockerisContext
import dockeris.DockerisExtension
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register
import utils.taskify

object ImageTaskFactory {
    fun DockerisExtension.createImageTemplateWithItsTasks(
        project: Project,
        name: String,
        version: String,
        platforms: List<String>,
        dependsOn: TaskProvider<Task>?,
        builder: DockerisImageTemplateBuilder.(context: DockerisContext) -> Unit
    ): DockerisImageTemplate {
        val template = DockerisImageTemplate(name, version, platforms, builder)
        val extension = this
        each { context ->
            val owner = context.owner
            val environment = context.environment
            val create = DockerfileTaskFactory.register(project, extension, template, dependsOn, context)

            val label = "$owner-$name-$environment".lowercase()
            val tag = "$label:$version".lowercase()
            val dir = directory.map { it.dir("$owner/${environment}/images/${template.name}") }
            run {// docker build
                val task = "dockerisImageBuild${name.capitalized()}ImageFor${owner.capitalized()}${environment.capitalized()}EnvironmentToLocalRegistry".taskify()
                project.tasks.register<Exec>(task) {
                    commandLine("docker", "build", "-t", tag, ".")
                    workingDir(dir)
                    dependsOn(create)
                }
            }

            run {// docker remove
                val task = "dockerisImageRemove${label.capitalized()}FromLocalRegistry".taskify()
                project.tasks.register<Exec>(task) {
                    commandLine("docker", "image", "rm", tag)
                    workingDir(dir)
                    dependsOn(create)
                }
            }
        }
        images.add(template)
        return template
    }
}