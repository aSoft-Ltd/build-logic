package dockate

import dockate.builders.DockerfileBuilder
import docker.builders.toRawText
import dockate.builders.DockerComposeFileBuilder
import dockate.models.DeploymentEnvironment
import dockate.models.Isolate
import dockate.models.LocalImage
import dockate.models.LocalImageRef
import dockate.models.ScopedDeploymentEnvironment
import dockate.models.ScopedDockerComposeFile
import dockate.models.map
import dockate.tasks.AllowRegistryTask
import dockate.tasks.CreateDockerComposeFileTask
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

    fun <T : Isolate> Project.image(
        environments: List<DeploymentEnvironment<T>>,
        name: String = this.name,
        version: String = this.version.toString(),
        dependsOn: TaskProvider<Task>? = null,
        builder: DockerfileBuilder.(env: ScopedDeploymentEnvironment<T>) -> Unit
    ): LocalImageRef {
        val images = mutableListOf<LocalImage<T>>()
        environments.map {
            it.toScoped(output.dir("${it.path}/images"))
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
                val image = LocalImage(
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
        return LocalImageRef(name, version, create, build, remove)
    }

    val OPEN_JDK_22_JDK_SLIM = "openjdk:22-jdk-slim"

    fun <T : Isolate> Project.compose(
        environments: List<DeploymentEnvironment<T>>,
        config: DockerComposeFileBuilder.(ScopedDeploymentEnvironment<T>) -> Unit
    ): List<ScopedDockerComposeFile<T>> {
        val files = mutableListOf<ScopedDockerComposeFile<T>>()
        tasks.register<Exec>("dockerSystemPrune") {
            commandLine("docker", "system", "prune", "--volumes", "-f")
        }

        val scopes = environments.map {
            it.toScoped(output.dir("${it.path}/compose"))
        }

        for (env in scopes) {
            val builder = DockerComposeFileBuilder()
            builder.name(env.imageTag)
            builder.config(env)
            with(builder) {
                files.add(build(env))
            }
        }
        return files
    }

    fun Project.registry(
        compose: List<ScopedDockerComposeFile<*>>,
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

        for (comp in compose) {
            val services = comp.services.filter { it.image.contains(comp.environment.name) }
            val imgs = services.map {
                val trail = "${it.name}-${name.capitalized()}-${comp.environment.taskNameTrail}".taskify()

                val local = it.image
                val remote = "$linkWithPort/$local"

                val tag = tasks.register<Exec>("dockerImageTag${trail}") {
                    group = "Dockate Image Tag"
                    dependsOn(allowRegistry)
                    comp.deps[it.name]?.forEach { dep -> dependsOn(dep) }
                    commandLine("docker", "image", "tag", local, remote)
                }

                val push = tasks.register<Exec>("dockerImagePush${trail}") {
                    group = "Dockate Image Push"
                    dependsOn(tag)
                    commandLine("docker", "image", "push", remote)
                }
                tag to push
            }

            val trail = "$name${comp.environment.taskNameTrail}".taskify()
            val tag = tasks.register("dockerImagesTag$trail") {
                group = "Dockate Image Tag"
                dependsOn(imgs.map { it.first })
            }

            val push = tasks.register("dockerImagesPush$trail") {
                group = "Dockate Image Push"
                dependsOn(imgs.map { it.second })
            }

            val location = output.dir("${comp.environment.path}/stacks/$name")
            val createComposeForDockerCompose = tasks.register<CreateDockerComposeFileTask>("createDockerComposeFileDockerCompose$trail") {
                group = "Dockate Create Dockerfile"
                directory.set(location)
                content.set(comp.map(registry = linkWithPort, clearName = false).toRawText("  "))
            }

            val createComposeFileForDockerStack = tasks.register<CreateDockerComposeFileTask>("createDockerComposeStackFileDockerStack$trail") {
                group = "Dockate Create Dockerfile"
                directory.set(location)
                filename.set("docker-stack-compose.yml")
                content.set(comp.map(registry = linkWithPort, clearName = true).toRawText("  "))
            }

            val base = "$workdir/apps/${comp.environment.path}"
            val destination = tasks.register<Exec>("createDirectory${trail}") {
                group = "Dockate Create Directory"
                val script = listOf(
                    "mkdir $base/root -p",
                    "mkdir $base/data -p"
                ).joinToString(" && ")
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val copyComposeFileForDockerCompose = tasks.register<Exec>("copyDockerComposeFileDockerCompose$trail") {
                group = "Dockate Copy"
                dependsOn(createComposeForDockerCompose, destination)
                workingDir(location)
                commandLine("sshpass", "-p", pass, "scp", "./docker-compose.yml", "$user@$linkWithoutPort:$base/docker-compose.yml")
            }

            val copyComposeFileForDockerStack = tasks.register<Exec>("copyDockerComposeFileDockerStack$trail") {
                group = "Dockate Copy"
                dependsOn(createComposeFileForDockerStack, destination)
                workingDir(location)
                commandLine("sshpass", "-p", pass, "scp", "./docker-stack-compose.yml", "$user@$linkWithoutPort:$base/docker-stack-compose.yml")
            }

            val pull = tasks.register<Exec>("dockerComposePull$trail") {
                group = "Dockate Pull"
                dependsOn(imgs.map { (_, push) -> push })
                dependsOn(copyComposeFileForDockerCompose)
                val script = "cd $base && echo $pass | sudo -S docker compose pull"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val volumesCreate = tasks.register<Exec>("dockerVolumesCreate$trail") {
                group = "Dockate Create Volume"
                val script = "echo $pass | sudo -S docker system prune --volumes -f && " + comp.volumes.joinToString(" && ") {
                    "sudo docker volume create ${comp.environment.qualifier.dashed}_${it.name}"
                }
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val volumesRemove = tasks.register<Exec>("dockerVolumesRemove$trail") {
                group = "Dockate Volume Remove"
                val script = "echo $pass | sudo -S docker system prune --volumes -f && " + comp.volumes.joinToString(" && ") {
                    "sudo docker volume remove ${comp.environment.qualifier.dashed}_${it.name}"
                }
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val up = tasks.register<Exec>("dockerComposeUp$trail") {
                group = "Docker Compose Up"
                dependsOn(copyComposeFileForDockerCompose, volumesCreate, pull)
                val script = "cd $base && echo $pass | sudo -S docker compose up -d --renew-anon-volumes"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val down = tasks.register<Exec>("dockerComposeDown$trail") {
                group = "Docker Compose Down"
                dependsOn(copyComposeFileForDockerCompose)
                val script = "cd $base && echo $pass | sudo -S docker compose down"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val deploy = tasks.register<Exec>("dockerStackDeploy$trail") {
                group = "Docker Stack Deploy"
                dependsOn(copyComposeFileForDockerStack, volumesCreate, pull)
                val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-stack-compose.yml ${comp.environment.qualifier.dashed}"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val remove = tasks.register<Exec>("dockerStackRemove$trail") {
                group = "Docker Stack Remove"
                val script = "echo $pass | sudo -S docker stack remove ${comp.environment.qualifier.dashed}"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }
        }
    }
}