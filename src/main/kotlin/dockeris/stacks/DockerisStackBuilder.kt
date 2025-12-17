package dockeris.stacks

import dockeris.DockerisContext
import dockeris.DockerisExtension
import dockeris.services.DockerisServiceBuilder
import dockeris.volumes.DockerisVolume
import dockeris.volumes.NfsDriver
import dockeris.volumes.VolumeDriver

class DockerisStackBuilder(private val context: DockerisContext) {
    var name: String? = null
    var version: Double = 3.8

    private val services = mutableMapOf<String, DockerisServiceBuilder.() -> Unit>()

    private val volumes = mutableMapOf<String, DockerisVolume>()

    fun volume(name: String, driver: VolumeDriver): DockerisVolume {
        val v = DockerisVolume(name, driver)
        volumes[name] = v
        return v
    }

    fun nfsVolume(name: String, address: String, device: String, permissions: String = "rw", version: Number = 4): DockerisVolume {
        val v = DockerisVolume(
            name = name,
            driver = NfsDriver(
                address = address,
                device = device,
                permissions = permissions,
                version = version
            )
        )
        volumes[name] = v
        return v
    }

    fun service(name: String, configure: DockerisServiceBuilder.() -> Unit) {
        services[name] = configure
    }

    fun build(extension: DockerisExtension): DockerisStackTemplate {
        return DockerisStackTemplate(
            name = name ?: throw IllegalArgumentException("Stack name is required"),
            version = version,
            context = context,
            services = services.map { (name, configure) ->
                val builder = DockerisServiceBuilder()
                builder.name(name)
                builder.configure()
                builder.build(extension)
            },
            volumes = volumes.values
        )
    }
}