package docker

import docker.builders.DockerComposeFileBuilder
import docker.builders.DockerfileBuilder
import docker.models.LocalImage
import docker.tasks.CreateDockerComposeFileTask
import docker.tasks.CreateDockerfileTask
import org.gradle.api.Project
import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.Exec
import org.gradle.kotlin.dsl.register

open class DockateExtension {
    private var dcfb = DockerComposeFileBuilder()

    fun Project.image(name: String, directory: Provider<Directory>, builder: DockerfileBuilder.() -> Unit): LocalImage {
        val create = tasks.register<CreateDockerfileTask>("createDockerfile") {
            this.directory.set(directory)
            rawDockerText.set(DockerfileBuilder().apply(builder).text.toString())
        }

        val build = tasks.register<Exec>("dockerImageBuild") {
            commandLine("docker", "build", "-t", name, ".")
            workingDir(create.flatMap { it.directory })
            dependsOn(create)
        }

        val remove = tasks.register<Exec>("dockerImageRemove") {
            commandLine("docker", "image", "remove", name)
        }

        return LocalImage(name, create, build, remove)
    }

    fun Project.jvmImage(
        from: String = "openjdk:22-jdk-slim",
        name: String = "${this.name}:${this.version}",
        directory: Provider<Directory> = layout.buildDirectory.dir("install/${this.name}"),
        port: Int
    ) = image(name = name, directory) {
        from(from)
        expose(port)
        copy("bin", "/app/bin")
        copy("lib", "/app/lib")
        volume("/app/root")
        cmd("/app/bin/${this@jvmImage}")
    }.apply {
        create.configure { dependsOn(this@jvmImage.tasks.named("installDist")) }
    }

    fun Project.compose(
        directory: Provider<Directory> = layout.buildDirectory.dir("install/$name"),
        builder: DockerComposeFileBuilder.() -> Unit
    ) {
        dcfb = DockerComposeFileBuilder().apply(builder)

        val prune = tasks.register<Exec>("dockerSystemPrune") {
            commandLine("docker", "system", "prune", "--volumes", "-f")
        }

        for (env in DockerEnvironment.values()) {
            val suffix = env.suffix
            val volumes = dcfb.volumes.map { it.copy(env) }
            val vc = volumes.map {
                tasks.register<Exec>("dockerVolumeCreate${it.name.taskify()}") {
                    commandLine("docker", "volume", "create", it.name)
                }
            }
            val vca = tasks.register("dockerVolumesCreateAll$suffix") { dependsOn(vc) }

            val vr = volumes.map {
                tasks.register<Exec>("dockerVolumeRemove${it.name.taskify()}") {
                    commandLine("docker", "volume", "remove", it.name)
                }
            }
            val vra = tasks.register("dockerVolumesRemoveAll$suffix") { dependsOn(vr) }

            val create = tasks.register<CreateDockerComposeFileTask>("createDockerComposeFile$suffix") {
                tasks.findByName("createAppDockerfile")?.let { dependsOn(it) }
                this.directory.set(directory)
                this.rawDockerComposeText.set(dcfb.build(env))
            }

            val down = tasks.register<Exec>("dockerComposeDown$suffix") {
                dependsOn(create)
                if (env == DockerEnvironment.Test) {
                    finalizedBy(vra, prune)
                }
                workingDir(directory)
                commandLine("docker", "compose", "down")
            }

            val up = tasks.register<Exec>("dockerComposeUp$suffix") {
                dependsOn(create, vca)
                workingDir(create.flatMap { it.directory })
                commandLine("docker", "compose", "up", "-d", "--renew-anon-volumes")
            }
        }
    }

    fun Project.registry(
        name: String,
        url: String,
        user: String,
        pass: String,
        directory: Provider<Directory> = layout.buildDirectory.dir("install/${this.name}")
    ) {
        val linkWithPort = url.split("//").lastOrNull() ?: url
        val linkWithoutPort = linkWithPort.split(":").firstOrNull() ?: linkWithPort
        val localTag = "${this@registry.name}:$version"
        val remoteTag = "$linkWithPort/$localTag"
        val build = tasks.findByName("dockerImageBuild")

        val tag = if (build != null) tasks.register<Exec>("dockerImageTagFor${name.taskify()}") {
            dependsOn(build)
            commandLine("docker", "image", "tag", localTag, remoteTag)
        } else null

        val push = if (build != null) tasks.register<Exec>("dockerImagePushTo${name.taskify()}") {
            dependsOn(tag)
            commandLine("docker", "image", "push", "$linkWithPort/$localTag")
        } else null

        val create = tasks.register<CreateDockerComposeFileTask>("createDockerComposeFileFor${name.taskify()}") {
            this.directory.set(directory)
            this.rawDockerComposeText.set(dcfb.build(DockerEnvironment.Prod))
            this.tag.set(remoteTag)
        }

        val base = "/$name/apps/${this@registry.name}"
        val destination = tasks.register<Exec>("createDestinationDirectoryFor${name.taskify()}") {
            val script = "mkdir $base/root -p && mkdir $base/data -p"
            commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
        }

        val copy = tasks.register<Exec>("copyDockerComposeFileTo${name.taskify()}") {
            dependsOn(create, destination)
            workingDir(directory)
            commandLine("sshpass", "-p", pass, "scp", "./docker-compose.yml", "$user@$linkWithoutPort:$base/docker-compose.yml")
        }

        val pull = tasks.register<Exec>("dockerComposePullIn${name.taskify()}") {
            if (push != null) dependsOn(push)
            dependsOn(copy)
            val script = "cd $base && docker-compose pull"
            commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
        }

        val volumes = tasks.register<Exec>("dockerVolumesCreateIn${name.taskify()}") {
            val script = "docker system prune --volumes -f && " + dcfb.volumes.joinToString(" && ") { "docker volume create ${it.name}" }
            commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
        }

        val deploy = tasks.register<Exec>("dockerStackDeployIn${name.taskify()}") {
            if (push != null) dependsOn(pull)
            dependsOn(copy, volumes)
            val script = "cd $base && docker stack deploy -c docker-compose.yml ${this@registry.name}"
            commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
        }

        val remove = tasks.register<Exec>("dockerStackRemoveIn${name.taskify()}") {
            val script = "docker stack remove ${this@registry.name}"
            commandLine("sshpass", "-p", pass, "ssh", "-t", "$user@$linkWithoutPort", "$script && exit; /bin/bash")
        }
    }
}