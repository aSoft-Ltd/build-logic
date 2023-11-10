package deployment.builders

class PlainDockerComposeFileBuilder {

    private var version: Double? = null
    fun version(value: Double) {
        version = value
    }

    private val services = mutableListOf<PlainDockerService>()
    fun service(name: String, builder: PlainDockerServiceBuilderDsl.() -> Unit) = services.add(PlainDockerServiceBuilderDsl(name).apply(builder).build())

    internal fun build() = PlainDockerComposeFile(version ?: 0.0, services)
}