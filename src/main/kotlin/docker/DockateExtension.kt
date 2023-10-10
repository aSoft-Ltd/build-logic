package docker

import docker.tasks.CreateDockerfileTask
import docker.tasks.DockerNetwork
import org.gradle.api.DefaultTask
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.file.Directory
import org.gradle.api.provider.Property
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register

open class DockateExtension {
    fun Project.addDockerContainerTasksFor(name: String, image: String, network: DockerNetwork? = null, vararg args: String): List<TaskProvider<Exec>> {
        val run = tasks.register<Exec>("run${name.capitalized()}Container") {
            val inline = if (network == null) {
                args.toList()
            } else {
                dependsOn(network.task)
                args.toList() + listOf("--network", network.name)
            }
            val arguments = listOf("docker", "run", "-d", "--name", name) + inline + image
            commandLine(*arguments.toTypedArray())
        }

        val stop = tasks.register<Exec>("stop${name.capitalized()}Container") {
            commandLine("docker", "container", "stop", name)
        }

        val remove = tasks.register<Exec>("remove${name.capitalized()}Container") {
            commandLine("docker", "container", "remove", name)
            dependsOn(stop)
        }

        val restart = tasks.register("restart${name.capitalized()}Container") {
            dependsOn(remove)
            finalizedBy(run)
        }

        return listOf(run, stop, remove)
    }

    fun Project.createNetwork(name: String) = DockerNetwork(
        name = name,
        task = tasks.register<Exec>("createDockerNetwork") {
            commandLine("docker", "network", "create", name)
        }
    )

    fun Project.remove(network: DockerNetwork) = tasks.register<Exec>("removeDockerNetwork") {
        commandLine("docker", "network", "remove", network.name)
    }

    fun Project.addDockerContainerTasksForMongo(
        name: String = "mongo",
        image: String = "mongo:latest",
        network: DockerNetwork? = null,
        port: Int,
        username: String,
        password: String
    ) = addDockerContainerTasksFor(
        name = name,
        image = image,
        network = network,
        args = arrayOf(
            "-p", "27017:$port",
            "-e", "MONGODB_INITDB_ROOT_USERNAME=$username",
            "-e", "MONGODB_INITDB_ROOT_PASSWORD=$password"
        )
    )

    fun Project.addDockerImageTasksFor(name: String, tag: String, directory: Provider<Directory>, builder: DockerfileBuilder.() -> Unit): List<TaskProvider<out Task>> {
        val create = tasks.register<CreateDockerfileTask>("create${name.capitalized()}Dockerfile") {
            this.directory.set(directory)
            rawDockerText.set(DockerfileBuilder().apply(builder).text.toString())
        }

        val build = tasks.register<Exec>("build${name.capitalized()}DockerImage") {
            commandLine("docker", "build", "-t", tag, ".")
            workingDir(create.flatMap { it.directory })
            dependsOn(create)
        }

        val remove = tasks.register<Exec>("remove${name.capitalized()}DockerImage") {
            commandLine("docker", "image", "remove", name)
        }
        return listOf(create, build, remove)
    }

    fun Project.addDockerImageTasksForJvmApp(
        name: String = "app",
        image: String = name,
        port: Int,
        directory: Provider<Directory>
    ) = addDockerImageTasksFor(name = name, tag = image, directory) {
        from("openjdk:22-jdk-slim")
        expose(port)
        copy(".", "/app")
        cmd("/app/bin/${this@addDockerImageTasksForJvmApp.name}")
    }
}