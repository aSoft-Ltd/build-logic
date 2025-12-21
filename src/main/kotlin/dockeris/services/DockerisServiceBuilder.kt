package dockeris.services

import dockeris.DockerisExtension
import dockeris.images.DockerisUniversalImageTemplate
import dockeris.images.Image
import dockeris.volumes.DockerisVolume

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

    fun image(image: Image) {
        imageName = image.name
        imageVersion = image.version
    }

    fun image(img: DockerisUniversalImageTemplate) {
        image(img.name, img.version)
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

    fun volume(v: DockerisVolume, path: String) {
        volumes.add(v.name to path)
    }

    private val environments = mutableMapOf<String, String>()
    fun environment(vararg variables: Pair<String, String>) {
        environments.putAll(variables)
    }

    class EnvironmentBuilder {
        internal val mappings = mutableMapOf<String, String>()
        infix fun String.to(value: String?) {
            mappings[this] = value.toString()
        }
    }

    fun environment(builder: EnvironmentBuilder.() -> Unit) {
        val e = EnvironmentBuilder().apply(builder)
        environments.putAll(e.mappings)
    }

    fun env(key: String, value: String) {
        environments[key] = value
    }

    internal fun build(extension: DockerisExtension) = DockerisServiceTemplate(
        name = name ?: throw IllegalArgumentException("Service name is required"),
        image = run {
            val name = imageName ?: throw IllegalArgumentException("Image name is required")
            val universal = extension.imgs.find { it.name == name }
            val contextual = extension.images.find { it.name == name }
            when {
                contextual != null && universal != null -> Image.Unpublished(name, universal.version, universal.platforms)
                contextual != null && universal == null -> Image.Unpublished(name, contextual.version, contextual.platforms)
                contextual == null && universal != null -> Image.Unpublished(name, universal.version, universal.platforms)
                else -> Image.Published(name, imageVersion ?: "latest")
            }
        },
        restart = restart,
        ports = ports,
        environments = environments,
        dependencies = dependencies,
        volumes = volumes
    )
}