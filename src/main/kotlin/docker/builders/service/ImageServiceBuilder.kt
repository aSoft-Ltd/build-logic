package docker.builders.service

import docker.models.LocalImage
import docker.models.Service

class ImageServiceBuilder(name: String, private val i: LocalImage) : ServiceBuilder(name) {
    override fun build() = Service(
        name = name,
        image = i,
        restart = restart,
        volumes = volumes,
        ports = ports,
        environments = environments
    )
}