package dockate.models

import docker.models.PlainDockerComposeFile
import docker.models.PlainDockerService

class ScopedDockerComposeFile<T : Isolate>(
    version: Double,
    name: String?,
    services: List<PlainDockerService>,
    volumes: ScopedDockerVolumes,
    val deps: Map<String,List<Any>>,
    val environment: ScopedDeploymentEnvironment<T>
) : PlainDockerComposeFile(version, name, services, volumes.volumes)