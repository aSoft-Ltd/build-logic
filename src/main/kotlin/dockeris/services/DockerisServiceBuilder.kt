package dockeris.services

import dockeris.DockerisExtension
import dockeris.images.Image

class DockerisServiceBuilder {
    private var name: String? = null
    fun name(value: String) {
        name = value
    }

    private var imageName: String? = null
    private var imageVersion: String? = null
    fun image(name: String, version: String? = null) {
        imageName = name
        imageVersion = version
    }


    private var restart: String? = null
    fun restart(value: String) {
        restart = value
    }

    private val ports = mutableListOf<Pair<Int, Int>>()
    fun port(outside: Int, inside: Int) {
        ports.add(outside to inside)
    }

    private val dependencies = mutableSetOf<String>()
    fun dependsOn(vararg services: String) {
        dependencies.addAll(services)
    }

    private val volumes = mutableListOf<Pair<String, String>>()
    fun volumes(vararg mappings: Pair<String, String>) {
        volumes.addAll(mappings)
    }

    private val environments = mutableMapOf<String, String>()
    fun environment(vararg variables: Pair<String, String>) {
        environments.putAll(variables)
    }

    fun env(key: String, value: String) {
        environments[key] = value
    }

    internal fun build(extension: DockerisExtension) = DockerisServiceTemplate(
        name = name ?: throw IllegalArgumentException("Service name is required"),
        image = run {
            val name = imageName ?: throw IllegalArgumentException("Image name is required")
            val found = extension.images.find { it.name == name }
            if (found == null || imageVersion != null) {
                Image.Published(name, imageVersion ?: "latest")
            } else {
                Image.Unpublished(name, found.version, found.platforms)
            }
        },
        restart = restart,
        ports = ports,
        environments = environments,
        dependencies =  dependencies,
        volumes = volumes
    )
}