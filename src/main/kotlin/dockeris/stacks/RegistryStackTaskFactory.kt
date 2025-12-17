package dockeris.stacks

import dockeris.DockerisExtension
import dockeris.images.Image
import dockeris.tooling.CreateTextFileTask
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import org.gradle.kotlin.dsl.register
import utils.taskify

object RegistryStackTaskFactory {

    var count = 0
    fun DockerisExtension.createRegistryStackTemplateWithItsTasks(
        project: Project,
        name: String,
        url: String,
        user: String,
        pass: String,
        workdir: String,
    ) {
        val domain = url.split("//").lastOrNull() ?: url
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
            if(project.tasks.findByName(bld) == null) project.tasks.register<Exec>(bld) {
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
                    content.set(stack.toDockerStackComposeFile(domain, context))
                }
            }

            val base = "/$workdir/apps/${owner}/${stack.name}/$environment"
            val linkWithoutPort = domain.split(":").firstOrNull() ?: domain
            val createDirectory = run {
                val task = "$owner-${stack.name}-${environment}-inside-registry-${name}".taskify()
                project.tasks.register<Exec>("createDirectory$task") {
                    group = "Dockate Create Directory"
                    val script = listOf(
                        "mkdir $base/root -p",
                        "mkdir $base/data -p"
                    ).joinToString(separator = " && ") { "sudo $it" }
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val copyComposeFileForDockerStack = run {
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-into-registry-${name}".taskify()
                project.tasks.register<Exec>("copy$task") {
                    dependsOn(createComposeFile, createDirectory)
                    workingDir(dir)
                    commandLine(
                        "sshpass",
                        "-p",
                        pass,
                        "scp",
                        "./docker-compose-$name.yml",
                        "$user@$linkWithoutPort:$base/docker-stack-compose.yml"
                    )
                }
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

            val label = "$owner-${stack.name}-${environment}"
            val deploy = run {
                val task = "$owner-${stack.name}-${environment}-inside-registry-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackDeploy$task") {
                    group = "Docker Stack Deploy"
                    dependsOn(copyComposeFileForDockerStack, pull)
                    val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-stack-compose.yml $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val remove = run {
                val task = "$owner-${stack.name}-${environment}-inside-registry-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackRemove$task") {
                    group = "Docker Stack Remove"
                    val script = "echo $pass | sudo -S docker stack remove $label"
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
        for (stack in stacks) {
            val context = stack.context
            val owner = context.owner
            val environment = context.environment
            val dir = directory.map { it.dir("$owner/${environment}/stacks/runner/$name/${stack.name}") }

            val domain = url.split("//").lastOrNull() ?: url

            val createComposeFile = run {
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-for-runner-${name}".taskify()
                project.tasks.register<CreateTextFileTask>("create$task") {
                    destination.set(dir.map { it.file("docker-compose-$name.yml") })
                    content.set(stack.toDockerStackComposeFile(domain, context))
                }
            }

//            val base = "/$workdir/apps/${owner}/${stack.name}/$environment"
            val base = "/$workdir/${stack.name}/$environment"
            val linkWithoutPort = domain.split(":").firstOrNull() ?: domain
            val createDirectory = run {
                val task = "$owner-${stack.name}-${environment}-inside-runner-${name}".taskify()
                project.tasks.register<Exec>("createDirectory$task") {
                    group = "Dockate Create Directory"
                    val script = listOf(
                        "mkdir $base/root -p",
                        "mkdir $base/data -p"
                    ).joinToString(separator = " && ") { "sudo $it" }
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val copyComposeFileForDockerStack = run {
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-into-runner-${name}".taskify()
                project.tasks.register<Exec>("copy$task") {
                    dependsOn(createComposeFile, createDirectory)
                    workingDir(dir)
                    commandLine(
                        "sshpass",
                        "-p",
                        pass,
                        "scp",
                        "./docker-compose-$name.yml",
                        "$user@$linkWithoutPort:$base/docker-stack-compose.yml"
                    )
                }
            }

            val pull = run {
                val task = "$owner-${stack.name}-${environment}-inside-runner-${name}".taskify()
                project.tasks.register<Exec>("dockerisComposePull$task") {
                    // TODO: Find a way to add a dependency to push on the registry first
//                    buildAndPush.forEach { dependsOn(it) }
                    dependsOn(copyComposeFileForDockerStack)
                    val script = "cd $base && echo $pass | sudo -S docker compose pull"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val label = "$owner-${stack.name}-${environment}"
            val deploy = run {
                val task = "$owner-${stack.name}-${environment}-inside-runner-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackDeploy$task") {
                    group = "Docker Stack Deploy"
                    dependsOn(copyComposeFileForDockerStack, pull)
                    val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-stack-compose.yml $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val remove = run {
                val task = "$owner-${stack.name}-${environment}-inside-runner-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackRemove$task") {
                    group = "Docker Stack Remove"
                    val script = "echo $pass | sudo -S docker stack remove $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }
        }
    }
}