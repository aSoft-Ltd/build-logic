package docker

import docker.tasks.CreateDockerfileTask
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
    fun Project.addDockerContainerTasksFor(name: String, image: String, vararg args: String): List<TaskProvider<Exec>> {
        val run = tasks.register<Exec>("run${name.capitalized()}Container") {
            val arguments = listOf("docker", "container", "run", "-d", "--name", name) + args.toList() + image
            commandLine(*arguments.toTypedArray())
        }

        val stop = tasks.register<Exec>("stop${name.capitalized()}Container") {
            commandLine("docker", "container", "stop", name)
        }

        val remove = tasks.register<Exec>("remove${name.capitalized()}Container") {
            commandLine("docker", "container", "remove", name)
            dependsOn(stop)
        }

        return listOf(run, stop, remove)
    }

    fun Project.addDockerContainerTasksForMongo(
        name: String = "mongo",
        image: String = "mongo:latest",
        port: Int,
        username: String,
        password: String
    ) = addDockerContainerTasksFor(
        name = name,
        image = image,
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
        return listOf(create,build, remove)
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