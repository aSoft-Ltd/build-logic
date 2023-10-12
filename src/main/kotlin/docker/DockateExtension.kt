package docker

import docker.builders.DockerComposeFileBuilder
import docker.builders.DockerfileBuilder
import docker.tasks.CreateDockerComposeFileTask
import docker.tasks.CreateDockerfileTask
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.file.Directory
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

    private fun String.taskify() = split("-").joinToString("") { it.capitalized() }

    fun Project.addDockerImageTasksForJvmApp(
        name: String = "app",
        from: String = "openjdk:22-jdk-slim",
        image: String = "${this.name}:${this.version}",
        directory: Provider<Directory> = layout.buildDirectory.dir("install/${this.name}"),
        port: Int
    ): List<TaskProvider<out Task>> {
        val dockerTasks = addDockerImageTasksFor(name = name, tag = image, directory) {
            from(from)
            expose(port)
            copy("bin", "/app/bin")
            copy("lib", "/app/lib")
            volume("/app/root")
            cmd("/app/bin/${this@addDockerImageTasksForJvmApp.name}")
        }

        val (createDockerfile, buildAppImage) = dockerTasks
        createDockerfile.configure { dependsOn(tasks.named("installDist")) }
        buildAppImage.configure { dependsOn(createDockerfile) }
        return dockerTasks
    }

    fun Project.dockerCompose(
        directory: Provider<Directory> = layout.buildDirectory.dir("install/$name"),
        builder: DockerComposeFileBuilder.() -> Unit
    ) {
        for (conf in listOf("", "Test")) {
            val env = if (conf == "Test") DockerEnvironment.Test else DockerEnvironment.Prod
            val dcf = DockerComposeFileBuilder(env).apply(builder)
            val volumeTasks = dcf.configuredVolumes.map {
                val dvc = tasks.register<Exec>("dockerVolumeCreate${it.name.taskify()}") {
                    commandLine("docker", "volume", "create", it.name)
                }
                val dvr = tasks.register<Exec>("dockerVolumeRemove${it.name.taskify()}") {
                    commandLine("docker", "volume", "rm", it.name)
                }
                dvc to dvr
            }

            val create = tasks.register<CreateDockerComposeFileTask>("createDockerComposeFile$conf") {
                tasks.findByName("createAppDockerfile")?.let { dependsOn(it) }
                this.directory.set(directory)
                this.rawDockerComposeText.set(dcf.build())
            }

            val prune = if (env == DockerEnvironment.Test) tasks.register<Exec>("dockerSystemPrune") {
                commandLine("docker", "system", "prune", "--volumes", "-f")
            } else null

            val down = tasks.register<Exec>("dockerComposeDown$conf") {
                dependsOn(create)
                if (env == DockerEnvironment.Test) {
                    volumeTasks.forEach { (_, dvr) -> finalizedBy(dvr) }
                    finalizedBy(prune)
                }
                workingDir(directory)
                commandLine("docker", "compose", "down")
            }

            val up = tasks.register<Exec>("dockerComposeUp$conf") {
                dependsOn(create)
                volumeTasks.forEach { (dvc, _) -> dependsOn(dvc) }
                workingDir(create.flatMap { it.directory })
                commandLine("docker", "compose", "up", "-d", "--renew-anon-volumes")
            }
        }
    }
}