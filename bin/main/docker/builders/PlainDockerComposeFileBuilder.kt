package docker.builders

import docker.models.PlainDockerService
import docker.models.PlainDockerVolume
import docker.models.PlainDockerComposeFile

open class PlainDockerComposeFileBuilder {

    private var version: Double? = null
    private var name: String? = null
    fun version(value: Double) {
        version = value
    }

    fun name(value: String) {
        name = value
    }

    private val services = mutableListOf<PlainDockerService>()

    internal val volumes = mutableListOf<PlainDockerVolume>()

    fun service(name: String, builder: PlainDockerServiceBuilderDsl.() -> Unit) = services.add(PlainDockerServiceBuilderDsl(name).apply(builder).build())

    fun volumes(vararg names: String) = names.onEach {
        volumes.add(PlainDockerVolume(it))
    }

    internal fun build() = PlainDockerComposeFile(version ?: 0.0, name, services, volumes)
}