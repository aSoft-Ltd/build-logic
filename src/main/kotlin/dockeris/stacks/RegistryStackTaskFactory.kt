package dockeris.stacks

import dockeris.DockerisExtension
import dockeris.images.Image
import dockeris.registries.DockerisRegistry
import dockeris.tooling.CreateTextFileTask
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import org.gradle.kotlin.dsl.register
import utils.taskify

object RegistryStackTaskFactory {
    fun DockerisExtension.createRegistryStackTemplateWithItsTasks(
        project: Project,
        registry: DockerisRegistry,
    ) {
        val name = registry.name
        val user = registry.user
        val pass = registry.pass
        val workdir = registry.workdir
        val domain = registry.domain

        val images = stacks.flatMap { it.services }.map { it.image }.filterIsInstance<Image.Unpublished>()

        val buildAndPush = images.map { image ->
            val task = "${image.name}-for-registry-${name}".taskify()
            val tag = "$domain/${image.name}:${image.version}"
            val location = directory.map { it.dir("images/${image.name}") }

            val rm = "dockerisImageRemove$task"
            if (project.tasks.findByName(rm) == null) project.tasks.register<Exec>(rm) {
                commandLine("docker", "image", "rm", tag)
                workingDir(location)
            }

            val bld = "dockerisImageBuild$task"
            if (project.tasks.findByName(bld) == null) project.tasks.register<Exec>(bld) {
                val script = buildList {
                    addAll(listOf("docker", "buildx", "build"))
                    if (image.platforms.isNotEmpty()) {
                        add("--platform")
                        add(image.platforms.joinToString(","))
                    }
                    add("-t")
                    add(tag)
                    add("--push")
                    add(".")
                }
                commandLine(*script.toTypedArray())
                workingDir(location)
                dependsOn("create" + "-${image.name}-dockerfile".taskify())
            }
            project.tasks.named(bld)
        }

        for (stack in stacks) {
            val context = stack.context
            val owner = context.owner
            val environment = context.environment
            val dir = directory.map { it.dir("$owner/${environment}/stacks/registry/${stack.name}") }

            val createComposeFile = run {
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-for-registry-${name}".taskify()
                project.tasks.register<CreateTextFileTask>("create$task") {
                    destination.set(dir.map { it.file("docker-compose-$name.yml") })
                    content.set(stack.toDockerStackComposeFile(domain))
                }
            }

            val base = "/$workdir/${stack.name}/$environment"
            val linkWithoutPort = domain.split(":").firstOrNull() ?: domain

            val copyComposeFileForDockerStack = run {
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-into-registry-${name}".taskify()
                project.tasks.register<Exec>("copy$task") {
                    dependsOn(createComposeFile)
                    workingDir(dir)
                    commandLine(
                        "sshpass",
                        "-p",
                        pass,
                        "scp",
                        "./docker-compose-$name.yml",
                        "$user@$linkWithoutPort:$base/docker-compose.yml"
                    )
                }
            }

            val label = "$owner-${stack.name}-${environment}"
            val remove = run {
                val task = "$owner-${stack.name}-${environment}-inside-registry-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackRemove$task") {
                    group = "Docker Stack Remove"
                    val script = "echo $pass | sudo -S docker stack remove $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val deleteImageTaskList = stack.services.map { it.image }.filterIsInstance<Image.Unpublished>().map { image ->
                val task = "delete-image-${image.name}-inside-registry-${registry.name}".taskify()

                if (project.tasks.findByName(task) == null) project.tasks.register<Exec>(task) {
                    group = "Docker Image Remove"
                    val script = "echo $pass | sudo -S docker image rm ${registry.domain}/${image.name}:${image.version}"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                    dependsOn(remove)
                }
                project.tasks.named(task)
            }

            val deleteAllImagesTask = run {
                val task = "delete-all-images-inside-registry-${registry.name}".taskify()
                if (project.tasks.findByName(task) == null) project.tasks.register(task) {
                    group = "Docker Image Remove"
                    if (deleteImageTaskList.isNotEmpty()) dependsOn(deleteImageTaskList)
                }
                project.tasks.named(task)
            }

            val pull = run {
                val task = "$owner-${stack.name}-${environment}-inside-registry-${name}".taskify()
                project.tasks.register<Exec>("dockerisComposePull$task") {
                    buildAndPush.forEach { dependsOn(it) }
                    dependsOn(copyComposeFileForDockerStack)
                    val script = "cd $base && echo $pass | sudo -S docker compose pull"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val deploy = run {
                val task = "$owner-${stack.name}-${environment}-inside-registry-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackDeploy$task") {
                    group = "Docker Stack Deploy"
                    dependsOn(copyComposeFileForDockerStack, pull)
                    val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-compose.yml $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val cleanDeploy = run {
                val task = "$owner-${stack.name}-${environment}-inside-registry-${registry.name}".taskify()
                project.tasks.register<Exec>("cleanDockerisStackDeploy$task") {
                    group = "Docker Stack Deploy"
                    dependsOn(copyComposeFileForDockerStack, pull, remove, deleteAllImagesTask)
                    val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-compose.yml $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }
        }
    }

    fun DockerisExtension.createRunnerStackTemplateWithItsTasks(
        project: Project,
        name: String,
        url: String,
        user: String,
        pass: String,
        workdir: String,
    ) {
        for (stack in stacks) for (registry in registries) {
            val context = stack.context
            val owner = context.owner
            val environment = context.environment
            val dir = directory.map { it.dir("$owner/${environment}/stacks/runner/$name/${stack.name}") }

            val domain = url.split("//").lastOrNull() ?: url

            val createComposeFile = run {
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-for-registry-${registry.name}-in-runner-${name}".taskify()
                project.tasks.register<CreateTextFileTask>("create$task") {
                    destination.set(dir.map { it.file("docker-compose-$name.yml") })
                    content.set(stack.toDockerStackComposeFile(registry.domain))
                }
            }

            val base = "/$workdir/${stack.name}/$environment"
            val linkWithoutPort = domain.split(":").firstOrNull() ?: domain

            val copyComposeFileForDockerStack = run {
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-for-registry-${registry.name}-into-runner-${name}".taskify()
                project.tasks.register<Exec>("copy$task") {
                    dependsOn(createComposeFile)
                    workingDir(dir)
                    commandLine(
                        "sshpass",
                        "-p",
                        pass,
                        "scp",
                        "./docker-compose-$name.yml",
                        "$user@$linkWithoutPort:$base/docker-compose.yml"
                    )
                }
            }

            val pull = run {
                val task = "$owner-${stack.name}-${environment}-for-registry-${registry.name}-inside-runner-${name}".taskify()
                project.tasks.register<Exec>("dockerisComposePull$task") {
                    for (img in stack.services.map { it.image }.filterIsInstance<Image.Unpublished>()) {
                        val t = "${img.name}-for-registry-${registry.name}".taskify()
                        dependsOn("dockerisImageBuild$t")
                    }
                    dependsOn(copyComposeFileForDockerStack)
                    val script = "cd $base && echo $pass | sudo -S docker compose pull"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val label = "$owner-${stack.name}-${environment}"
            val remove = run {
                val task = "$owner-${stack.name}-${environment}-for-registry-${registry.name}-inside-runner-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackRemove$task") {
                    group = "Docker Stack Remove"
                    val script = "echo $pass | sudo -S docker stack remove $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val deleteImageTaskList = stack.services.map { it.image }.filterIsInstance<Image.Unpublished>().map { image ->
                val task = "delete-image-${image.name}-for-registry-${registry.name}-inside-runner-${name}".taskify()

                if (project.tasks.findByName(task) == null) project.tasks.register<Exec>(task) {
                    group = "Docker Image Remove"
                    val script = "echo $pass | sudo -S docker image rm ${registry.domain}/${image.name}:${image.version}"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                    dependsOn(remove)
                }
                project.tasks.named(task)
            }

            val deleteAllImagesTask = run {
                val task = "delete-all-images-for-registry-${registry.name}-inside-runner-${name}".taskify()
                if (project.tasks.findByName(task) == null) project.tasks.register(task) {
                    group = "Docker Image Remove"
                    if (deleteImageTaskList.isNotEmpty()) dependsOn(deleteImageTaskList)
                }
                project.tasks.named(task)
            }

            val deploy = run {
                val task = "$owner-${stack.name}-${environment}-for-registry-${registry.name}-inside-runner-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackDeploy$task") {
                    group = "Docker Stack Deploy"
                    dependsOn(copyComposeFileForDockerStack, pull)
                    val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-compose.yml $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val cleanDeploy = run {
                val task = "$owner-${stack.name}-${environment}-for-registry-${registry.name}-inside-runner-${name}".taskify()
                project.tasks.register<Exec>("cleanDockerisStackDeploy$task") {
                    group = "Docker Stack Deploy"
                    dependsOn(copyComposeFileForDockerStack, pull, remove, deleteAllImagesTask)
                    val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-compose.yml $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }
        }
    }
}