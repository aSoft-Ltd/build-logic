package dockeris.stacks

import dockeris.DockerisExtension
import dockeris.images.Image
import dockeris.tooling.CreateTextFileTask
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import org.gradle.kotlin.dsl.register
import utils.taskify

object RegistryStackTaskFactory {
    fun DockerisExtension.createStackTemplateWithItsTasks(
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
            val dir = directory.map { it.dir("$owner/${environment}/stacks/${stack.name}") }

            val domain = url.split("//").lastOrNull() ?: url

            val buildAndPush = stack.services.map { it.image }.filterIsInstance<Image.Unpublished>().map { image ->
                val task = "${context.owner}-${image.name}-${context.environment}-for-${name}".taskify()
                val tag = "$domain/${image.toQualifiedName(context)}"
                val location = directory.map { it.dir("$owner/${environment}/images/${image.name}") }

                project.tasks.register<Exec>("dockerisImageRemove$task") {
                    commandLine("docker", "image", "rm", tag)
                    workingDir(location)
                }

                project.tasks.register<Exec>("dockerisImageBuild$task") {
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
                    dependsOn("create" + ("$owner-${image.name}-${environment}-dockerfile".taskify()))
                }
            }

            val createComposeFile = run {
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-for-${name}".taskify()
                project.tasks.register<CreateTextFileTask>("create$task") {
                    destination.set(dir.map { it.file("docker-compose-$name.yml") })
                    content.set(stack.toDockerStackComposeFile(domain, context))
                }
            }

            val base = "/$workdir/apps/${owner}/${stack.name}/$environment"
            val linkWithoutPort = domain.split(":").firstOrNull() ?: domain
            val createDirectory = run {
                val task = "$owner-${stack.name}-${environment}-inside-${name}".taskify()
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
                val task = "$owner-${stack.name}-${environment}-docker-compose-file-into-${name}".taskify()
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
                val task = "$owner-${stack.name}-${environment}-inside-${name}".taskify()
                project.tasks.register<Exec>("dockerisComposePull$task") {
                    buildAndPush.forEach { dependsOn(it) }
                    dependsOn(copyComposeFileForDockerStack)
                    val script = "cd $base && echo $pass | sudo -S docker compose pull"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

//            val volumesCreate = {
//                val task = "$owner-${stack.name}-${environment}-volumes-create-inside-${name}".taskify()
//                project.tasks.register<Exec>("dockerisVolumesCreate${trail("Inside")}") {
//                    group = "Dockate Create Volume"
//                    val script =
//                        "echo $pass | sudo -S docker system prune --volumes -f && " + comp.volumes.joinToString(" && ") {
//                            "sudo docker volume create ${dashed}_${it.name}"
//                        }
//                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
//                }
//            }
//
//            val volumesRemove = tasks.register<Exec>("dockerVolumesRemove${trail("From")}") {
//                group = "Dockate Volume Remove"
//                val script =
//                    "echo $pass | sudo -S docker system prune --volumes -f && " + comp.volumes.joinToString(" && ") {
//                        "sudo docker volume remove ${dashed}_${it.name}"
//                    }
//                commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
//            }

            val label = "$owner-${stack.name}-${environment}"
            val deploy = run {
                val task = "$owner-${stack.name}-${environment}-inside-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackDeploy$task") {
                    group = "Docker Stack Deploy"
                    dependsOn(copyComposeFileForDockerStack, pull)
                    val script = "cd $base && echo $pass | sudo -S docker stack deploy -c docker-stack-compose.yml $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }

            val remove = run {
                val task = "$owner-${stack.name}-${environment}-inside-${name}".taskify()
                project.tasks.register<Exec>("dockerisStackRemove$task") {
                    group = "Docker Stack Remove"
                    val script = "echo $pass | sudo -S docker stack remove $label"
                    commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
                }
            }
        }
    }
}