package docker.builders

class ServiceBuilder(private val tab: String) {

    private val lines = mutableListOf<String>()

    private val ports = mutableSetOf<PortMapping>()
    fun image(tag: String) = lines.add("$tab${tab}image: $tag")
    fun restart(value: String) = lines.add("$tab${tab}restart: $value")
    fun volumes(vararg mappings: Pair<VolumeBuilder.Volume, String>) = append("volumes", operator = ":", mappings)

    fun port(inside: Int, outside: Int) = ports.add(PortMapping(inside, outside))

    fun environment(vararg variables: Pair<String, Any>) = append("environment", operator = "=", variables)

    fun dependsOn(vararg services: Service) {
        lines.add("$tab${tab}depends_on:")
        services.forEach { lines.add("$tab$tab$tab- ${it.name}") }
    }

    private fun append(name: String, operator: String, values: Array<out Pair<Any, Any>>) {
        lines.add("$tab${tab}$name:")
        values.forEach { (key, value) -> lines.add("""$tab$tab$tab- $key$operator$value""") }
    }

    internal fun build(): String {
        if (ports.isNotEmpty()) {
            lines.add("$tab${tab}ports:")
            for (p in ports) lines.add("""$tab$tab$tab- "${p.outside}:${p.inside}"""")
        }
        return lines.joinToString("\n")
    }

    class Service internal constructor(val name: String)
}