package docker.builders

class DockerComposeFileBuilder(private val externalVolumes: Boolean) {
    private val lines = mutableListOf<String>()

    private val tab = "  "

    private val configuredVolumes = mutableListOf<VolumeBuilder.Volume>()
    fun version(value: Double) = lines.add("""version: "$value"""")

    fun services(builder: ServicesBuilder.() -> Unit) {
        lines.add("")
        lines.add("services:")
        ServicesBuilder().apply(builder)
    }

    fun volumes(vararg names: String): List<VolumeBuilder.Volume> = names.map {
        VolumeBuilder(it).volume
    }.onEach {
        configuredVolumes.add(it)
    }

    fun volume(name: String, builder: VolumeBuilder.() -> Unit) {
        configuredVolumes.add(VolumeBuilder(name).apply(builder).volume)
    }

    fun networks(vararg names: String): List<Network> {
        lines.add("")
        lines.add("networks:")
        return names.map {
            lines.add("$tab$it:")
            Network(it)
        }
    }

    internal fun build(): String {
        val l = if (configuredVolumes.isNotEmpty()) {
            lines + "volumes:" + configuredVolumes.flatMap { it.toLines(tab, externalVolumes) }
        } else lines
        return l.joinToString("\n")
    }

    inner class ServicesBuilder {
        fun service(name: String, builder: ServiceBuilder.() -> Unit): ServiceBuilder.Service {
            lines.add("$tab$name:")
            lines.add(ServiceBuilder(tab).apply(builder).build())
            lines.add("")
            return ServiceBuilder.Service(name)
        }
    }

    class Network internal constructor(val name: String)
}