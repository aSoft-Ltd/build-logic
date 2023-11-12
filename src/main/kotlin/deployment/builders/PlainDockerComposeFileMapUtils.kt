package deployment.builders

import docker.models.Isolate
import docker.models.ScopedDeploymentEnvironment2
import utils.hyphenize

fun <T : Isolate> PlainDockerComposeFile.map(env: ScopedDeploymentEnvironment2<T>, deps: Map<String, List<Any>>) = PlainDockerComposeFile(
    version = version,
    name = name,
    services = services.map { it.map(env, deps.containsKey(it.name)) },
    volumes = volumes.map { it.map(env) }
)

private fun <T : Isolate> PlainDockerService.map(
    env: ScopedDeploymentEnvironment2<T>,
    mapImageToo: Boolean
) = PlainDockerService(
    name = name,
    image = if (mapImageToo) image.substringBefore(":").mapped(env) + ":" + image.substringAfter(":") else image,
    restart = restart,
    privileged = privileged,
    exposes = exposes,
    ports = ports,
    environments = environments,
    dependencies = dependencies,
    volumes = volumes.map { mapping ->
        mapping.mapOutside {
            it.mapped(env)
        }
    }
)

private fun <T : Isolate> PlainDockerVolume.map(env: ScopedDeploymentEnvironment2<T>) = PlainDockerVolume(
    name = name.mapped(env)
)

private fun <T : Isolate> String.mapped(env: ScopedDeploymentEnvironment2<T>) = "${env.isolate.name}-$this-${env.name}".hyphenize()