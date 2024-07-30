package dockate.builders

import docker.builders.PlainDockerComposeFileBuilder
import docker.builders.PlainDockerServiceBuilderDsl
import docker.builders.map
import docker.builders.toRawText
import dockate.models.Isolate
import dockate.models.ScopedDeploymentEnvironment
import dockate.models.ScopedDockerComposeFile
import dockate.models.ScopedDockerVolume
import dockate.models.ScopedDockerVolumes
import dockate.tasks.CreateDockerComposeFileTask
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskCollection
import org.gradle.api.tasks.TaskProvider
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register
import utils.hyphenize
import utils.taskify

class DockerComposeFileBuilder : PlainDockerComposeFileBuilder() {

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

    fun <T : Isolate> Project.build(stack: String,env: ScopedDeploymentEnvironment<T>): ScopedDockerComposeFile<T> {
        val dcf = build().map(env, deps)

        val volumes = dcf.volumes.map {
            val trail = (stack + env.taskNameTrail + it.name.capitalized()).taskify()
            val prefix = "${env.isolate.name.hyphenize()}-${stack.hyphenize()}-${env.name}"
            ScopedDockerVolume(
                name = it.name,
                create = tasks.register<Exec>("dockerVolumeCreate$trail") {
                    group = "Dockate Create Volume"
                    workingDir(env.workdir)
                    commandLine("docker", "volume", "create", prefix + "_" + it.name)
                },
                remove = tasks.register<Exec>("dockerVolumeRemove$trail") {
                    group = "Dockate Remove Volume"
                    workingDir(env.workdir)
                    commandLine("docker", "volume", "remove", prefix + "_" + it.name)
                }
            )
        }

        val trail = (stack + env.taskNameTrail).taskify()
        val scopedVolumes = ScopedDockerVolumes(
            volumes = volumes,
            create = tasks.register("dockerVolumesCreate${trail}") {
                group = "Dockate Create Volumes"
                dependsOn(volumes.map { it.create })
            },
            remove = tasks.register("dockerVolumesRemove${trail}") {
                group = "Dockate Remove Volumes"
                dependsOn(volumes.map { it.remove })
            }
        )

        val create = tasks.register<CreateDockerComposeFileTask>("createDockerComposeFile${stack.capitalized()}${env.taskNameTrail}") {
            group = "Dockate Create Compose File"
            directory.set(env.workdir)
            content.set(dcf.toRawText("  "))
        }

        val up = tasks.register<Exec>("dockerComposeUp${stack.capitalized()}${env.taskNameTrail}") {
            group = "Dockate Compose Up"
            workingDir(env.workdir)
            dependsOn(create, scopedVolumes.create)
            dependsOn(deps.values.flatten())
            commandLine("docker", "compose", "up", "-d", "--renew-anon-volumes")
        }

        val down = tasks.register<Exec>("dockerComposeDown${stack.capitalized()}${env.taskNameTrail}") {
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