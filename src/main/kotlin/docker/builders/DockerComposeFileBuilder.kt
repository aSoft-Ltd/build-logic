package docker.builders

import docker.builders.service.ImageServiceBuilder
import docker.builders.service.RegistryServiceBuilder
import docker.builders.service.ServiceBuilder
import docker.models.LocalImageRef
import docker.models.RunningEnvironment
import docker.models.Service
import docker.models.Volume
import org.gradle.api.Project

class DockerComposeFileBuilder(val environment: String) {

    internal val volumes = mutableListOf<Volume>()

    private var version: Double? = null
    fun version(value: Double) {
        version = value
    }

    private val services = mutableListOf<Service<*>>()
    fun service(
        name: String, image: LocalImageRef,
        builder: ImageServiceBuilder.() -> Unit
    ) = ImageServiceBuilder(name, image).apply(builder).addToServices()

    fun service(
        name: String,
        image: String,
        configure: RegistryServiceBuilder.() -> Unit
    ) = RegistryServiceBuilder(name, image).apply(configure).addToServices()

    private fun ServiceBuilder.addToServices() = build(environment).also { services.add(it) }

    fun Project.volumes(vararg names: String) = names.map { volume(it) }

    fun Project.volume(name: String) = Volume(name = name).also { volumes.add(it) }
    internal fun build(env: RunningEnvironment) = buildString {
        appendLine("""version: "$version"""")
        with(DockerComposeFileAppender(tab = "  ")) {
            appendLine(services, env)
            appendLine(volumes, env)
        }
    }
}