package docker.builders.service

import docker.models.RegistryImage
import docker.models.Service

class RegistryServiceBuilder(name: String, private val i: String) : ServiceBuilder(name) {

    override fun build() = Service(
        name = name,
        image = RegistryImage(i),
        restart = restart,
        volumes = volumes,
        ports = ports,
        environments = environments
    )
}