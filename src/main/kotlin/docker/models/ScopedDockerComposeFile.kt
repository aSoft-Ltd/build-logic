package docker.models

import deployment.builders.PlainDockerComposeFile
import deployment.builders.PlainDockerService

class ScopedDockerComposeFile<T : Isolate>(
    version: Double,
    name: String?,
    services: List<PlainDockerService>,
    volumes: ScopedDockerVolumes,
    val environment: ScopedDeploymentEnvironment2<T>
) : PlainDockerComposeFile(version, name, services, volumes.volumes)