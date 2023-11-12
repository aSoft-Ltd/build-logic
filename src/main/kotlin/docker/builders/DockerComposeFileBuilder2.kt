package docker.builders

import deployment.builders.PlainDockerComposeFileBuilder
import deployment.builders.PlainDockerServiceBuilderDsl
import deployment.builders.map
import deployment.builders.toRawText
import docker.models.Isolate
import docker.models.ScopedDeploymentEnvironment2
import docker.models.ScopedDockerComposeFile
import docker.models.ScopedDockerVolume
import docker.models.ScopedDockerVolumes
import docker.tasks.CreateDockerComposeFileTask
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskCollection
import org.gradle.api.tasks.TaskProvider
import org.gradle.kotlin.dsl.add
import org.gradle.kotlin.dsl.register
import utils.taskify

class DockerComposeFileBuilder2 : PlainDockerComposeFileBuilder() {

    internal val deps = mutableMapOf<String, MutableList<Any>>()

    fun service(
        name: String,
        dependsOn: TaskCollection<*>,
        builder: PlainDockerServiceBuilderDsl.() -> Unit
    ) {
        deps.getOrPut(name) { mutableListOf() }.add(dependsOn)
        service(name, builder)
    }

    fun service(
        name: String,
        dependsOn: String,
        builder: PlainDockerServiceBuilderDsl.() -> Unit
    ) {
        deps.getOrPut(name) { mutableListOf() }.add(dependsOn)
        service(name, builder)
    }

    fun service(
        name: String,
        dependsOn: TaskProvider<Task>,
        builder: PlainDockerServiceBuilderDsl.() -> Unit
    ) {
        deps.getOrPut(name) { mutableListOf() }.add(dependsOn)
        service(name, builder)
    }

    fun mongo(
        name: String = "mongo",
        image: String = "mongo:4.4.25-focal", // MongoDB 5.0+ requires a CPU with AVX support, and your current
        username: String,
        password: String,
        port: Int,
        configure: PlainDockerServiceBuilderDsl.() -> Unit = {}
    ) = service(name) {
        image(image)
        restart("always")
        port(outside = port, inside = 27017)
        expose(27017)
        environment(
            "MONGO_INITDB_ROOT_USERNAME" to username,
            "MONGO_INITDB_ROOT_PASSWORD" to password
        )
        configure()
    }

    fun <T : Isolate> Project.build(env: ScopedDeploymentEnvironment2<T>): ScopedDockerComposeFile<T> {
        val dcf = build().map(env, deps)

        val volumes = dcf.volumes.map {
            val trail = it.name.taskify() + env.taskNameTrail
            ScopedDockerVolume(
                name = it.name,
                create = tasks.register<Exec>("dockerVolumeCreate$trail") {
                    group = "Dockate Create Volume"
                    workingDir(env.workdir)
                    commandLine("docker", "volume", "create", it.name)
                },
                remove = tasks.register<Exec>("dockerVolumeRemove$trail") {
                    group = "Dockate Remove Volume"
                    workingDir(env.workdir)
                    commandLine("docker", "volume", "remove", it.name)
                }
            )
        }

        val scopedVolumes = ScopedDockerVolumes(
            volumes = volumes,
            create = tasks.register("dockerVolumesCreate${env.taskNameTrail}") {
                group = "Dockate Create Volumes"
                dependsOn(volumes.map { it.create })
            },
            remove = tasks.register("dockerVolumesRemove${env.taskNameTrail}") {
                group = "Dockate Remove Volumes"
                dependsOn(volumes.map { it.remove })
            }
        )

        val create = tasks.register<CreateDockerComposeFileTask>("createDockerComposeFile${env.taskNameTrail}") {
            group = "Dockate Create Compose File"
            directory.set(env.workdir)
            content.set(dcf.toRawText("  "))
        }

        val up = tasks.register<Exec>("dockerComposeUp${env.taskNameTrail}") {
            group = "Dockate Compose Up"
            workingDir(env.workdir)
            dependsOn(create, scopedVolumes.create)
            dependsOn(deps.values.flatten())
            commandLine("docker", "compose", "up", "-d", "--renew-anon-volumes")
        }

        val down = tasks.register<Exec>("dockerComposeDown${env.taskNameTrail}") {
            group = "Dockate Compose Down"
            workingDir(env.workdir)
            commandLine("docker", "compose", "down")
        }

        return ScopedDockerComposeFile(
            version = dcf.version,
            name = dcf.name,
            services = dcf.services,
            volumes = scopedVolumes,
            deps = deps,
            environment = env
        )
    }
}