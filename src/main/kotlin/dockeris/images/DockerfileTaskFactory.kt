package dockeris.images

import dockeris.DockerisContext
import dockeris.DockerisExtension
import dockeris.tooling.CreateTextFileTask
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.TaskProvider
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register
import utils.taskify

object DockerfileTaskFactory {
    internal fun register(
        project: Project,
        extension: DockerisExtension,
        template: DockerisImageTemplate,
        dependency: TaskProvider<Task>?,
        context: DockerisContext
    ): TaskProvider<CreateTextFileTask> {
        val env = context.environment
        val owner = context.owner
        val dir = extension.directory.map { it.dir("$owner/${env}/images/${template.name}") }
        val builder = template.builder(context)
        val copies = builder.copy.map { copy ->
            val task = "copyDockeris${copy.destination.capitalized()}DirectoryFor${owner.capitalized()}${env.capitalized()}Environment".taskify()
            project.tasks.register<Copy>(task) {
                from(copy.source)
                into(dir.map { it.file(copy.destination) })
                dependsOn(dependency)
            }
        }
        val files = builder.dependencies.map { dep ->
            CreateTextFileTask.register(project, dep, context).apply {
                configure {
                    val task = this
                    task.content.set(dep.builder.build(context))
                    task.destination.set(dir.map { it.file(dep.destination) })
                    dependsOn(dependency)
                }
            }
        }

        val label = "$owner-${template.name}-${env}-dockerfile".taskify()
        return project.tasks.register<CreateTextFileTask>("create$label") {
            val main = this
            main.content.set(template.build(context))
            main.destination.set(dir.map { it.file("Dockerfile") })
            for (task in (files + copies + dependency)) main.dependsOn(task)
        }
    }

    internal fun register(
        project: Project,
        extension: DockerisExtension,
        template: DockerisUniversalImageTemplate,
        dependency: TaskProvider<Task>?
    ): TaskProvider<CreateTextFileTask> {
        val dir = extension.directory.map { it.dir("images/${template.name}") }
        val builder = template.builder
        val copies = builder.copy.map { copy ->
            val task = "copyDockeris${copy.destination.capitalized()}Directory".taskify()
            project.tasks.register<Copy>(task) {
                from(copy.source)
                into(dir.map { it.file(copy.destination) })
                dependsOn(dependency)
            }
        }
        val files = builder.dependencies.map { dep ->
            CreateTextFileTask.register(project, dep).apply {
                configure {
                    val task = this
                    task.content.set(dep.builder.build())
                    task.destination.set(dir.map { it.file(dep.destination) })
                    dependsOn(dependency)
                }
            }
        }

        val label = "${template.name}-dockerfile".taskify()
        return project.tasks.register<CreateTextFileTask>("create$label") {
            val main = this
            main.content.set(builder.build())
            main.destination.set(dir.map { it.file("Dockerfile") })
            for (task in (files + copies + dependency)) main.dependsOn(task)
        }
    }
}