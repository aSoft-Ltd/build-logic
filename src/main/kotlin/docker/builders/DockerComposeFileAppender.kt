package docker.builders

import docker.models.Mapping
import docker.models.RunningEnvironment
import docker.models.Service
import docker.models.Volume

internal class DockerComposeFileAppender(private val tab: String) {
    @JvmName("appendServices")
    fun StringBuilder.appendLine(services: List<Service<*>>, env: RunningEnvironment) {
        appendLine()
        appendLine("services:")
        for (service in services) appendLine(service, env)
    }

    private fun StringBuilder.appendLine(service: Service<*>, env: RunningEnvironment) {
        appendLine("""$tab${service.name}:""")
        appendLine("""$tab${tab}image: ${service.image.name}""")
        if (service.restart != null) {
            appendLine("""$tab${tab}restart: ${service.restart}""")
        }
        appendLine("environment", "=", service.environments)
        appendLine("volumes", ":", service.volumes.map { Mapping(it.outside.copy(env).name.lowercase(), it.inside) })
        appendPorts(service.ports)
        if (service.dependencies.isNotEmpty()) appendDependencies(service.dependencies)
    }

    private fun StringBuilder.appendDependencies(services: List<Service<*>>) {
        appendLine("${tab}${tab}depends_on:")
        services.forEach {
            appendLine("${tab}${tab}${tab}- ${it.name}")
        }
    }

    private fun StringBuilder.appendLine(key: String, operator: String, items: List<Mapping<Any, Any>>) {
        if (items.isEmpty()) return
        appendLine("$tab$tab$key:")
        items.forEach { appendLine("$tab$tab${tab}- ${it.outside}${operator}${it.inside}") }
    }

    private fun StringBuilder.appendPorts(items: List<Mapping<Int, Int>>) {
        if (items.isNotEmpty()) appendLine("$tab${tab}ports:")
        items.forEach { appendLine("""$tab$tab${tab}- "${it.outside}:${it.inside}"""") }
    }

    @JvmName("appendVolumes")
    fun StringBuilder.appendLine(volumes: List<Volume>, env: RunningEnvironment) {
        if (volumes.isEmpty()) return
        appendLine()
        appendLine("volumes:")
        for (volume in volumes.map { it.copy(env) }) appendLine(volume)
    }

    private fun StringBuilder.appendLine(volume: Volume) {
        val name = volume.name.lowercase()
        appendLine("$tab${name}:")
        appendLine("$tab${tab}name: $name")
        appendLine("$tab${tab}external: true")
    }
}