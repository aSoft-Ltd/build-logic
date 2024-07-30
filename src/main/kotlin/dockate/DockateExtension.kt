package dockate

import dockate.builders.DockerfileBuilder
import docker.builders.toRawText
import dockate.builders.DockerComposeFileBuilder
import dockate.models.*
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

    fun Project.image(
        name: String,
        version: String = this.version.toString(),
        dependsOn: TaskProvider<Task>? = null,
        builder: DockerfileBuilder.() -> Unit
    ): String {
        val dfb = DockerfileBuilder(objects.listProperty(), objects.listProperty())
        dfb.apply(builder)
        val tf = with(dfb) {
            build(output, name, dependsOn)
        }

        val build = tasks.register<Exec>("dockerImageBuild${name.capitalized()}") {
            group = "Docker Image Build"
            commandLine("docker", "build", "--platform", "linux/arm64", "-t", "$name:$version", ".")
            workingDir(output)
            if (dependsOn != null) dependsOn(dependsOn)
            dependsOn(tf.create)
        }
        val remove = tasks.register<Exec>("dockerImageRemove${name.capitalized()}") {
            group = "Docker Image Remove"
            commandLine("docker", "image", "remove", "$name:$version")
        }
        return "$name:$version"
    }

    fun <T : Isolate> Project.image(
        environments: List<DeploymentEnvironment<T>>,
        name: String = this.name,
        version: String = this.version.toString(),
        dependsOn: TaskProvider<Task>? = null,
        builder: DockerfileBuilder.(env: ScopedDeploymentEnvironment<T>) -> Unit
    ): LocalImageRef {
        val images = mutableListOf<LocalImage<T>>()
        environments.map {
            it.toScoped(output.dir("${it.path}/images/$name"))
        }.forEach { environment ->
            val imageTag = "${environment.isolate.name}-${name}-${environment.name}".hyphenize()
            val versionedImageTag = "$imageTag:$version"
            val taskName = "${name}-${environment.isolate.name}-${environment.name}".taskify()
            DockerfileBuilder(objects.listProperty(), objects.listProperty()).apply {
                builder(environment)
                val dockerFile = build(environment, name, dependsOn)
                val build = tasks.register<Exec>("dockerImageBuild${taskName}") {
                    group = "Docker Image Build"
                    commandLine("docker", "build", "-t", versionedImageTag, ".")
                    workingDir(environment.workdir)
                    if (dependsOn != null) dependsOn(dependsOn)
                    dependsOn(dockerFile.create)
                }
                val remove = tasks.register<Exec>("dockerImageRemove${taskName}") {
                    group = "Docker Image Remove"
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

        val trail = name.capitalized().taskify()
        val create = tasks.register("createDockerfiles$trail") {
            group = "Dockate Create Dockerfiles"
            dependsOn(images.map { it.dockerFile.create })
        }

        val build = tasks.register("dockerImagesBuild$trail") {
            group = "Docker Image Build"
            dependsOn(images.map { it.build })
        }

        val remove = tasks.register("dockerImagesRemove$trail") {
            group = "Docker Image Remove"
            dependsOn(images.map { it.remove })
        }
        return LocalImageRef(name, version, create, build, remove)
    }

    val OPEN_JDK_22_JDK_SLIM = "openjdk:22-jdk-slim"
    val NODE_18_19_0_ALPINE_3_18 = "node:18.19.0-alpine3.18"
    val NGINX_STABLE_PERL = "nginx:stable-perl"

    fun <T : Isolate> Project.compose(
        environments: List<DeploymentEnvironment<T>>,
        name: String = this.name,
        config: DockerComposeFileBuilder.(ScopedDeploymentEnvironment<T>) -> Unit
    ): Stack<T> {
        val files = mutableListOf<ScopedDockerComposeFile<T>>()
        tasks.register<Exec>("dockerSystemPrune") {
            commandLine("docker", "system", "prune", "--volumes", "-f")
        }

        val scopes = environments.map {
            it.toScoped(output.dir("${it.path}/compose"))
        }

        for (env in scopes) {
            val builder = DockerComposeFileBuilder()
            builder.name("${env.isolate.name}-$name-${env.name}")
            builder.config(env)
            with(builder) {
                files.add(build(name, env))
            }
        }
        return Stack(name, files)
    }

    class RegistryDeployment(
        val file: ScopedDockerComposeFile<*>,
        val up: TaskProvider<out Task>,
        val down: TaskProvider<out Task>,
        val deploy: TaskProvider<out Task>,
        val remove: TaskProvider<out Task>,
    )

    fun Project.registry(
        compose: Stack<*>,
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

        val deps = mutableListOf<RegistryDeployment>()

        for (comp in compose.files) {
            val services = comp.services.filter { it.image.contains(comp.environment.name) }
            val dashed = "${comp.environment.isolate.name}-${compose.name}-${comp.environment.name}"
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

            fun trail(adjective: String) = "${compose.name}${comp.environment.taskNameTrail}${adjective}${name.capitalized()}".taskify()
//            val trail = "${compose.name}${comp.environment.taskNameTrail}For${name.capitalized()}".taskify()
            val tag = tasks.register("dockerImagesTag${trail("For")}") {
                group = "Dockate Image Tag"
                dependsOn(imgs.map { it.first })
            }

            val push = tasks.register("dockerImagesPush${trail("For")}") {
                group = "Dockate Image Push"
                dependsOn(imgs.map { it.second })
            }

            val location = output.dir("${comp.environment.path}/stacks/$name")
            val createComposeForDockerCompose =
                tasks.register<CreateDockerComposeFileTask>("createDockerComposeFileDockerCompose${trail("For")}") {
                    group = "Dockate Create Dockerfile"
                    directory.set(location)
                    content.set(comp.map(registry = linkWithPort, clearName = false).toRawText("  "))
                }

            val createComposeFileForDockerStack =
                tasks.register<CreateDockerComposeFileTask>("createDockerComposeStackFileDockerStack${trail("For")}") {
                    group = "Dockate Create Dockerfile"
                    directory.set(location)
                    filename.set("docker-stack-compose.yml")
                    content.set(comp.map(registry = linkWithPort, clearName = true).toRawText("  "))
                }

            val base = "$workdir/apps/${comp.environment.path}"
            val destination = tasks.register<Exec>("createDirectory${trail("In")}") {
                group = "Dockate Create Directory"
                val script = listOf(
                    "mkdir $base/root -p",
                    "mkdir $base/data -p"
                ).joinToString(" && ")
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val copyComposeFileForDockerCompose = tasks.register<Exec>("copyDockerComposeFileDockerCompose${trail("To")}") {
                group = "Dockate Copy"
                dependsOn(createComposeForDockerCompose, destination)
                workingDir(location)
                commandLine(
                    "sshpass",
                    "-p",
                    pass,
                    "scp",
                    "./docker-compose.yml",
                    "$user@$linkWithoutPort:$base/docker-compose.yml"
                )
            }

            val copyComposeFileForDockerStack = tasks.register<Exec>("copyDockerComposeFileDockerStack${trail("To")}") {
                group = "Dockate Copy"
                dependsOn(createComposeFileForDockerStack, destination)
                workingDir(location)
                commandLine(
                    "sshpass",
                    "-p",
                    pass,
                    "scp",
                    "./docker-stack-compose.yml",
                    "$user@$linkWithoutPort:$base/docker-stack-compose.yml"
                )
            }

            val pull = tasks.register<Exec>("dockerComposePull${trail("For")}") {
                group = "Dockate Pull"
                dependsOn(imgs.map { (_, push) -> push })
                dependsOn(copyComposeFileForDockerCompose)
                val script = "cd $base && echo $pass | sudo -S docker compose pull"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val volumesCreate = tasks.register<Exec>("dockerVolumesCreate${trail("Inside")}") {
                group = "Dockate Create Volume"
                val script =
                    "echo $pass | sudo -S docker system prune --volumes -f && " + comp.volumes.joinToString(" && ") {
                        "sudo docker volume create ${dashed}_${it.name}"
                    }
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val volumesRemove = tasks.register<Exec>("dockerVolumesRemove${trail("From")}") {
                group = "Dockate Volume Remove"
                val script =
                    "echo $pass | sudo -S docker system prune --volumes -f && " + comp.volumes.joinToString(" && ") {
                        "sudo docker volume remove ${dashed}_${it.name}"
                    }
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val up = tasks.register<Exec>("dockerComposeUp${trail("In")}") {
                group = "Docker Compose Up"
                dependsOn(copyComposeFileForDockerCompose, volumesCreate, pull)
                val script = "cd $base && echo $pass | sudo -S docker compose up -d --renew-anon-volumes"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val down = tasks.register<Exec>("dockerComposeDown${trail("In")}") {
                group = "Docker Compose Down"
                dependsOn(copyComposeFileForDockerCompose)
                val script = "cd $base && echo $pass | sudo -S docker compose down"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val deploy = tasks.register<Exec>("dockerStackDeploy${trail("To")}") {
                group = "Docker Stack Deploy"
                dependsOn(copyComposeFileForDockerStack, volumesCreate, pull)
                val script =
                    "cd $base && echo $pass | sudo -S docker stack deploy -c docker-stack-compose.yml $dashed"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val remove = tasks.register<Exec>("dockerStackRemove${trail("From")}") {
                group = "Docker Stack Remove"
                val script = "echo $pass | sudo -S docker stack remove $dashed"
                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
            }

            val dep = RegistryDeployment(comp, up, down, deploy, remove)
            deps.add(dep)
        }

        for ((env, deployments) in deps.groupBy { it.file.environment.name }) {
            fun trail(adjective: String) = "${env}$adjective${name.capitalized()}".taskify()
            tasks.register("dockerComposeUp${trail("In")}") {
                group = "Docker Compose Up"
                dependsOn(deployments.map { it.up })
            }

            tasks.register("dockerComposeDown${trail("In")}") {
                group = "Docker Compose Up"
                dependsOn(deployments.map { it.down })
            }

            tasks.register("dockerStackDeploy${trail("To")}") {
                group = "Docker Stack Deploy"
                dependsOn(deployments.map { it.deploy })
            }

            tasks.register("dockerStackRemove${trail("From")}") {
                group = "Docker Stack Remove"
                dependsOn(deployments.map { it.remove })
            }
        }
    }
}