package dockeris.stacks

import dockeris.DockerisContext
import dockeris.DockerisExtension
import dockeris.services.DockerisServiceBuilder

class DockerisStackBuilder(private val context: DockerisContext) {
    var name: String? = null
    var version: Double = 3.8

    private val services = mutableMapOf<String, DockerisServiceBuilder.() -> Unit>()
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
            }
        )
    }
}