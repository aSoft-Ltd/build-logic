package dockeris.images

import dockeris.DockerisExtension
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register
import utils.taskify

internal object ImageTaskFactory {
    fun DockerisExtension.createUniversalImageTemplateWithItsTasks(
        project: Project,
        name: String,
        version: String,
        platforms: List<String>,
        dependsOn: TaskProvider<Task>?,
        builder: DockerisUniversalImageBuilder.() -> Unit
    ): DockerisUniversalImageTemplate {
        val b = DockerisUniversalImageBuilder().apply(builder)
        val template = DockerisUniversalImageTemplate(name, version, platforms, b)
        val extension = this
        val create = DockerfileTaskFactory.register(project, extension, template, dependsOn)

        val label = name.lowercase()
        val tag = "$label:$version".lowercase()
        val dir = directory.map { it.dir("images/${template.name}") }
        run {// docker build
            val task = "dockerisImageBuild${name.capitalized()}".taskify()
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
        images.add(template)
        return template
    }
}