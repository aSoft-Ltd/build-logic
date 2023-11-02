package docker.builders.service

import docker.models.LocalImageRef
import docker.models.RegistryImage
import docker.models.RunningEnvironment
import docker.models.Service

class ImageServiceBuilder(name: String, private val i: LocalImageRef) : ServiceBuilder(name) {
    override fun build(environment: String) = Service(
        name = name,
        image = RegistryImage("${i.name}-${environment.lowercase()}:${i.version}"),
        restart = restart,
        volumes = volumes,
        ports = ports,
        environments = environments,
        dependencies = dependencies
    )
}