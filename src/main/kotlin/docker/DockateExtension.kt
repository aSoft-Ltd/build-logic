package docker

import docker.builders.DockerComposeFileBuilder
import docker.builders.DockerfileBuilder
import docker.builders.RunningEnvironmentBuilder
import docker.models.LocalImage
import docker.models.LocalImageRef
import docker.models.RunningEnvironment
import docker.models.Volume
import docker.tasks.CreateDockerComposeFileTask
import docker.tasks.CreateDockerfileTask
import org.gradle.api.Project
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.Exec
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register

abstract class DockateExtension(internal val project: Project) {
    abstract val output: DirectoryProperty

    private val environments = mutableListOf<RunningEnvironment>()

    private val images = mutableListOf<LocalImageRef>()

    private var stack: String = ""
    fun environments(vararg names: String, configuration: RunningEnvironmentBuilder.(String) -> Unit) = names.map { name ->
        RunningEnvironmentBuilder().run {
            configuration(name)
            project.build(name, output)
        }.also {
            environments.add(it)
        }
    }

    fun Project.image(
        name: String = this.name,
        version: String = this.version.toString(),
        builder: DockerfileBuilder.(RunningEnvironment) -> Unit
    ): LocalImageRef {
        val envs = environments.map { environment ->
            val middleName = "${name.taskify()}${environment.name.capitalized()}"
            val location = output.dir("images/${name.lowercase()}/${environment.name.lowercase()}")
            val dfb = DockerfileBuilder().apply { builder(environment) }
            val create = tasks.register<CreateDockerfileTask>("create${middleName}Dockerfile") {
                this.directory.set(location)
                content.set(dfb.text.toString())
            }

            val copy = tasks.register<Copy>("copy${middleName}ImageSources") {
                group = "Dockate Create"
                dfb.sources.map { it.configuration(this) }
                from(dfb.sources.map { it.location })
                into(location)
            }

            val image = "$name-${environment.name.lowercase()}:${version}"
            val build = tasks.register<Exec>("dockerImageBuild${middleName}") {
                group = "Dockate Build"
                commandLine("docker", "build", "-t", image, ".")
                workingDir(create.flatMap { it.directory })
                dependsOn(create, copy)
            }

            val remove = tasks.register<Exec>("dockerImageRemove${middleName}") {
                group = "Dockate Remove"
                commandLine("docker", "image", "remove", image)
            }

            LocalImage(name, version, environment, create, copy, build, remove, location)
        }

        val create = tasks.register("create${name.taskify()}Dockerfiles") {
            group = "Dockate Create"
            dependsOn(envs.map { it.create })
        }

        val copy = tasks.register("copy${name.taskify()}ImageSources") {
            group = "Dockate Create"
            dependsOn(envs.map { it.copy })
        }

        val build = tasks.register("docker${name.taskify()}ImagesBuild") {
            group = "Dockate Build"
            dependsOn(envs.map { it.build })
        }

        val remove = tasks.register("docker${name.taskify()}ImagesRemove") {
            group = "Dockate Remove"
            dependsOn(envs.map { it.remove })
        }

        return LocalImageRef(name, version, envs, create, copy, build, remove).also { images.add(it) }
    }

    val OPEN_JDK_22_JDK_SLIM = "openjdk:22-jdk-slim"

    private fun Project.volumeCreateTask(volume: Volume) = tasks.register<Exec>("dockerVolumeCreate${volume.name.taskify()}") {
        commandLine("docker", "volume", "create", volume.name)
    }

    private fun Project.volumeRemoveTask(volume: Volume) = tasks.register<Exec>("dockerVolumeRemove${volume.name.taskify()}") {
        commandLine("docker", "volume", "remove", volume.name)
    }

    fun Project.compose(stack: String, builder: DockerComposeFileBuilder.(RunningEnvironment) -> Unit) {
        this@DockateExtension.stack = stack
        val prune = tasks.register<Exec>("dockerSystemPrune") {
            commandLine("docker", "system", "prune", "--volumes", "-f")
        }

        for (env in environments) {
            val dcfb = env.dcf.apply { builder(env) }
            val imgs = images.flatMap { it.images }.filter { it.environment == env }

            val middle = "${stack.taskify()}${env.name.taskify()}"
            val volumes = dcfb.volumes.map { it.copy(env) }
            val dvc = volumes.map { volumeCreateTask(it) }
            val dvca = tasks.register("dockerVolumesCreateAll$middle") { dependsOn(dvc) }
            val dvr = volumes.map { volumeRemoveTask(it) }
            val dvra = tasks.register("dockerVolumesRemoveAll$middle") { dependsOn(dvr) }

            val location = output.dir("stacks/$stack-${env.name}".lowercase())

            val createFile = tasks.register<CreateDockerComposeFileTask>("create${middle}DockerComposeFile") {
                this.directory.set(location)
                this.content.set(dcfb.build(env))
            }

            val down = tasks.register<Exec>("dockerComposeDown$middle") {
                dependsOn(createFile)
                if (env.name.contains("test", ignoreCase = true) || env.name.contains("dev", ignoreCase = true)) {
                    finalizedBy(dvra, prune)
                }
                workingDir(location)
                commandLine("docker", "compose", "down")
            }

            val up = tasks.register<Exec>("dockerComposeUp$middle") {
                dependsOn(imgs.map { it.build })
                dependsOn(createFile, dvca)
                workingDir(createFile.flatMap { it.directory })
                commandLine("docker", "compose", "up", "-d", "--renew-anon-volumes")
            }
        }
    }

    fun Project.registry(
        name: String,
        url: String,
        user: String,
        pass: String
    ) {
        val linkWithPort = url.split("//").lastOrNull() ?: url
        val linkWithoutPort = linkWithPort.split(":").firstOrNull() ?: linkWithPort
        for (env in environments) {
            val images = images.flatMap { it.images }.filter { it.environment == env }
            val imageTasks = images.map {
                val middle = it.qualifiedNameWithoutVersion.taskify()
                val local = it.qualifiedNameWithVersion
                val remote = "$linkWithPort/$local"
                val tag = tasks.register<Exec>("dockerImageTag${middle}For${name.capitalized()}") {
                    dependsOn(it.build)
                    commandLine("docker", "image", "tag", local, remote)
                }

                val push = tasks.register<Exec>("dockerImagePush${middle}To${name.taskify()}") {
                    dependsOn(tag)
                    commandLine("docker", "image", "push", remote)
                }

                tag to push
            }

            val middle = "${stack.capitalized()}${env.name.taskify()}"
            val location = output.dir("stacks/$name/$stack-${env.name}".lowercase())
            val create = tasks.register<CreateDockerComposeFileTask>("create${middle}DockerComposeFileFor${name.taskify()}") {
                this.directory.set(location)
                this.content.set(env.dcf.build(env))
                this.tags.set(images.associate { it.qualifiedNameWithVersion to "$linkWithPort/${it.qualifiedNameWithVersion}" })
            }

            val base = "/$name/apps/${stack.lowercase()}/${env.name.lowercase()}"
            val destination = tasks.register<Exec>("create${middle}DirectoryIn${name.taskify()}") {
                val script = "mkdir $base/root -p && mkdir $base/data -p"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val copy = tasks.register<Exec>("copy${middle}DockerComposeFileTo${name.taskify()}") {
                dependsOn(create, destination)
                workingDir(location)
                commandLine("sshpass", "-p", pass, "scp", "./docker-compose.yml", "$user@$linkWithoutPort:$base/docker-compose.yml")
            }

            val pull = tasks.register<Exec>("dockerComposePull${middle}In${name.taskify()}") {
                dependsOn(imageTasks.map { (_, push) -> push })
                dependsOn(copy)
                val script = "cd $base && docker-compose pull"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val volumes = tasks.register<Exec>("docker${middle}VolumesCreateIn${name.taskify()}") {
                val script = "docker system prune --volumes -f && " + env.dcf.volumes.map { it.copy(env) }.joinToString(" && ") { "docker volume create ${it.name}" }
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val deploy = tasks.register<Exec>("dockerStackDeploy${middle}In${name.taskify()}") {
                dependsOn(copy, volumes, pull)
                val script = "cd $base && docker stack deploy -c docker-compose.yml $stack-${env.name.lowercase()}"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val remove = tasks.register<Exec>("dockerStackRemove${middle}In${name.taskify()}") {
                val script = "docker stack remove $stack-${env.name.lowercase()}"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }
        }
    }
}