package dockeris.stacks

import dockeris.DockerisContext
import dockeris.DockerisExtension
import dockeris.images.Image
import dockeris.tooling.CreateTextFileTask
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register
import utils.taskify

object LocalStackTaskFactory {
    fun DockerisExtension.createStackTemplateWithItsTasks(
        project: Project,
        configuration: DockerisStackBuilder.(context: DockerisContext) -> Unit
    ) {
        each { context ->
            val owner = context.owner
            val environment = context.environment
            val builder = DockerisStackBuilder(context)
            val stack = builder.run {
                configuration(context)
                build(this@createStackTemplateWithItsTasks)
            }
            stacks.add(stack)
            val dir = directory.map { it.dir("$owner/${environment}/stacks/${stack.name}") }
            val images = stack.services.map { it.image }.filterIsInstance<Image.Unpublished>()

            val create = project.tasks.register<CreateTextFileTask>("createDockerisComposeFileFor${owner.capitalized()}${stack.name.capitalized()}${environment.capitalized()}Environment".taskify()) {
                destination.set(dir.map { it.file("docker-compose.yml") })
                content.set(stack.toDockerComposeFile(context))
            }

            project.tasks.register<Exec>("dockerisComposeUp${owner.capitalized()}${stack.name.capitalized()}${environment.capitalized()}Environment".taskify()) {
                commandLine("docker", "compose", "up", "-d")
                workingDir(dir)
                dependsOn(create)
                images.forEach { image ->
                    val task = "dockerisImageBuild${image.name.capitalized()}ImageFor${owner.capitalized()}${environment.capitalized()}EnvironmentToLocalRegistry".taskify()
                    dependsOn(project.tasks.named(task))
                }
            }

            project.tasks.register<Exec>("dockerisComposeDown${owner.capitalized()}${stack.name.capitalized()}${environment.capitalized()}Environment".taskify()) {
                commandLine("docker", "compose", "down")
                workingDir(dir)
                dependsOn(create)
            }
        }
    }
}