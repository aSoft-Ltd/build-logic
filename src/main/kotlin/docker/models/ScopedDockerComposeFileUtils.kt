package docker.models

import deployment.builders.PlainDockerComposeFile
import deployment.builders.PlainDockerService

fun <T : Isolate> ScopedDockerComposeFile<T>.map(registry: String, clearName: Boolean) = PlainDockerComposeFile(
    version = version,
    name = if (clearName) null else name,
    services = services.map {
        if (deps.containsKey(it.name)) {
            it.map(registry)
        } else it
    },
    volumes = volumes
)

private fun PlainDockerService.map(registry: String) = PlainDockerService(
    name = name,
    image = "$registry/$image",
    restart = restart,
    privileged = privileged,
    exposes = exposes,
    ports = ports,
    environments = environments,
    dependencies = dependencies,
    volumes = volumes,
)