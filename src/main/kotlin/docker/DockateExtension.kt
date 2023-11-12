package docker

import deployment.builders.DockerfileBuilder
import docker.builders.DockerComposeFileBuilder
import docker.builders.DockerComposeFileBuilder2
import docker.models.DeploymentEnvironment2
import docker.models.Isolate
import docker.models.LocalImage2
import docker.models.LocalImageRef
import docker.models.LocalImageRef2
import docker.models.RunningEnvironment
import docker.models.ScopedDeploymentEnvironment2
import docker.models.ScopedDockerComposeFile
import docker.models.Volume
import docker.tasks.AllowRegistryTask
import docker.tasks.CreateDockerComposeFileTask
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.listProperty
import org.gradle.kotlin.dsl.register
import utils.hyphenize
import utils.taskify

abstract class DockateExtension(internal val project: Project) {
    abstract val output: DirectoryProperty

    private val environments = mutableListOf<RunningEnvironment>()

    private val images = mutableListOf<LocalImageRef>()

    private var stack: String = ""

    fun <T : Isolate> Project.image(
        environments: List<DeploymentEnvironment2<T>>,
        name: String = this.name,
        version: String = this.version.toString(),
        dependsOn: TaskProvider<Task>? = null,
        builder: DockerfileBuilder.(env: ScopedDeploymentEnvironment2<T>) -> Unit
    ): LocalImageRef2<T> {
        val images = mutableListOf<LocalImage2<T>>()
        environments.map {
            it.toScoped(layout.buildDirectory.dir("dockate/images/${it.path}"))
        }.forEach { environment ->
            val imageTag = "${environment.isolate.name}-${name}-${environment.name}".hyphenize()
            val versionedImageTag = "$imageTag:$version"
            val taskName = "${name}-${environment.isolate.name}-${environment.name}".taskify()
            DockerfileBuilder(objects.listProperty(), objects.listProperty()).apply {
                builder(environment)
                val dockerFile = build(environment, dependsOn)
                val build = tasks.register<Exec>("dockerImageBuild${taskName}") {
                    group = "Dockate Build Image"
                    commandLine("docker", "build", "-t", versionedImageTag, ".")
                    workingDir(environment.workdir)
                    if (dependsOn != null) dependsOn(dependsOn)
                    dependsOn(dockerFile.create)
                }
                val remove = tasks.register<Exec>("dockerImageRemove${taskName}") {
                    group = "Dockate Remove Image"
                    commandLine("docker", "image", "remove", versionedImageTag)
                }
                val image = LocalImage2(
                    name = name,
                    version = version,
                    environment = environment,
                    dockerFile = dockerFile,
                    build = build,
                    remove = remove
                )
                images.add(image)
            }
        }

        val create = tasks.register("createDockerfiles") {
            group = "Dockate Create Dockerfiles"
            dependsOn(images.map { it.dockerFile.create })
        }

        val build = tasks.register("dockerImagesBuild") {
            group = "Docker Build Images"
            dependsOn(images.map { it.build })
        }

        val remove = tasks.register("dockerImagesRemove") {
            group = "Dockate Remove Images"
            dependsOn(images.map { it.remove })
        }
        return LocalImageRef2(name, version, images, create, build, remove)
    }

    val OPEN_JDK_22_JDK_SLIM = "openjdk:22-jdk-slim"

    private fun Project.volumeCreateTask(volume: Volume) = tasks.register<Exec>("dockerVolumeCreate${volume.name.taskify()}") {
        commandLine("docker", "volume", "create", volume.name)
    }

    private fun Project.volumeRemoveTask(volume: Volume) = tasks.register<Exec>("dockerVolumeRemove${volume.name.taskify()}") {
        commandLine("docker", "volume", "remove", volume.name)
    }

    fun <T : Isolate> Project.compose(
        environments: List<DeploymentEnvironment2<T>>,
        config: DockerComposeFileBuilder2.(ScopedDeploymentEnvironment2<T>) -> Unit
    ): List<ScopedDockerComposeFile<T>> {
        val files = mutableListOf<ScopedDockerComposeFile<T>>()
        val prune = tasks.register<Exec>("dockerSystemPrune") {
            commandLine("docker", "system", "prune", "--volumes", "-f")
        }

        val scopes = environments.map {
            it.toScoped(layout.buildDirectory.dir("dockate/compose/${it.path}"))
        }

        for (env in scopes) {
            val builder = DockerComposeFileBuilder2()
            builder.name(env.imageTag)
            builder.config(env)
            with(builder) {
                files.add(build(env))
            }
        }
        return files
    }

//    fun Project.compose(stack: String, builder: DockerComposeFileBuilder.(RunningEnvironment) -> Unit) {
//        this@DockateExtension.stack = stack
//        val prune = tasks.register<Exec>("dockerSystemPrune") {
//            commandLine("docker", "system", "prune", "--volumes", "-f")
//        }
//
//        for (env in environments) {
//            val dcfb = env.dcf.apply { builder(env) }
//            val imgs = images.flatMap { it.images }.filter { it.environment == env }
//
//            val middle = "${stack.taskify()}${env.name.taskify()}"
//            val volumes = dcfb.volumes.map { it.copy(env) }
//            val dvc = volumes.map { volumeCreateTask(it) }
//            val dvca = tasks.register("dockerVolumesCreateAll$middle") { dependsOn(dvc) }
//            val dvr = volumes.map { volumeRemoveTask(it) }
//            val dvra = tasks.register("dockerVolumesRemoveAll$middle") { dependsOn(dvr) }
//
//            val location = output.dir("stacks/$stack-${env.name}".lowercase())
//
//            val createFile = tasks.register<CreateDockerComposeFileTask>("create${middle}DockerComposeFile") {
//                this.directory.set(location)
//                this.content.set(dcfb.build(env))
//            }
//
//            val down = tasks.register<Exec>("dockerComposeDown$middle") {
//                dependsOn(createFile)
//                if (env.name.contains("test", ignoreCase = true) || env.name.contains("dev", ignoreCase = true)) {
//                    finalizedBy(dvra, prune)
//                    finalizedBy(imgs.map { it.remove })
//                }
//                workingDir(location)
//                commandLine("docker", "compose", "down")
//            }
//
//            val up = tasks.register<Exec>("dockerComposeUp$middle") {
//                dependsOn(imgs.map { it.build })
//                dependsOn(createFile, dvca)
//                workingDir(createFile.flatMap { it.directory })
//                commandLine("docker", "compose", "up", "-d", "--renew-anon-volumes")
//            }
//        }
//    }

    fun Project.registry(
        name: String,
        url: String,
        user: String,
        pass: String,
        workdir: String = name,
    ) {
        val linkWithPort = url.split("//").lastOrNull() ?: url
        val linkWithoutPort = linkWithPort.split(":").firstOrNull() ?: linkWithPort

        val allowRegistry = tasks.register<AllowRegistryTask>("allowRegistryFor${name.capitalized()}") {
            registry.set(linkWithPort)
        }

        for (env in environments) {
            val images = images.flatMap { it.images }.filter { it.environment.name == env.name }
            val imageTasks = images.map {
                val middle = it.qualifiedNameWithoutVersion.taskify()
                val local = it.qualifiedNameWithVersion
                val remote = "$linkWithPort/$local"
                val tag = tasks.register<Exec>("dockerImageTag${middle}For${name.capitalized()}") {
                    dependsOn(allowRegistry)
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
//                this.content.set(env.dcf.build(env))
                this.tags.set(images.associate { it.qualifiedNameWithVersion to "$linkWithPort/${it.qualifiedNameWithVersion}" })
            }

            val base = "/$workdir/apps/${stack.lowercase()}/${env.name.lowercase()}"
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
                val script = "cd $base && echo $pass | sudo -S docker compose pull"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

//            val volumes = tasks.register<Exec>("docker${middle}VolumesCreateIn${name.taskify()}") {
//                val script = "echo $pass | sudo -S docker system prune --volumes -f && " + env.dcf.volumes.map { it.copy(env) }.joinToString(" && ") {
//                    "sudo docker volume create ${it.name}"
//                }
//                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
//            }
//
//            val deploy = tasks.register<Exec>("dockerStackDeploy${middle}In${name.taskify()}") {
//                dependsOn(copy, volumes, pull)
//                val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-compose.yml $stack-${env.name.lowercase()}"
//                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
//            }

            val remove = tasks.register<Exec>("dockerStackRemove${middle}In${name.taskify()}") {
                val script = "echo $pass | sudo -S docker stack remove $stack-${env.name.lowercase()}"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }
        }
    }
}