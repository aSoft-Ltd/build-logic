package docker.builders

import docker.models.PlainDockerService
import docker.models.PlainDockerVolume
import docker.models.PlainDockerComposeFile
import docker.models.Mapping

fun PlainDockerComposeFile.toRawText(tab: String) = buildString {
    appendLine("""version: "$version"""")
    if (name != null) {
        appendLine()
        appendLine("""name: $name""")
    }
    appendLine(services, tab)
    appendLine(volumes, tab)
}

@JvmName("appendServices")
private fun StringBuilder.appendLine(services: List<PlainDockerService>, tab: String) {
    if(services.isEmpty()) return
    appendLine()
    appendLine("services:")
    for (service in services) appendLine(service, tab)
}

@JvmName("appendVolumes")
private fun StringBuilder.appendLine(volumes: List<PlainDockerVolume>, tab: String) {
    if(volumes.isEmpty()) return
    appendLine()
    appendLine("volumes:")
    for (volume in volumes) appendLine("$tab${volume.name}:")
}

private fun StringBuilder.appendLine(service: PlainDockerService, tab: String) {
    appendLine("""$tab${service.name}:""")
    appendLine("""$tab${tab}image: ${service.image}""")
    if (service.restart != null) {
        appendLine("""$tab${tab}restart: ${service.restart}""")
    }
    if (service.privileged != null) {
        appendLine("""$tab${tab}privileged: ${service.privileged}""")
    }
    appendLine("environment", operator = "=", service.environments, tab)
    appendLine("ports", operator = ":", service.ports, tab)
    appendLine("expose", service.exposes, tab)
    appendLine("depends_on", service.dependencies, tab)
    appendLine("volumes", operator = ":", service.volumes, tab)
    appendLine()
}

private fun StringBuilder.appendLine(key: String, operator: String, items: List<Mapping<Any, Any>>, tab: String) {
    if (items.isEmpty()) return
    appendLine("$tab$tab$key:")
    items.forEach { appendLine("$tab$tab${tab}- ${it.outside}${operator}${it.inside}") }
}

private fun StringBuilder.appendLine(key: String, items: List<Any>, tab: String) {
    if (items.isEmpty()) return
    appendLine("$tab$tab$key:")
    items.forEach { appendLine("$tab$tab${tab}- $it") }
}