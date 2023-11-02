package deployment.builders

import docker.models.Mapping

fun PlainDockerComposeFile.toRawText(tab: String) = buildString {
    appendLine("""version: "$version"""")
    appendLine(services, tab)
}

@JvmName("appendServices")
private fun StringBuilder.appendLine(services: List<PlainDockerService>, tab: String) {
    appendLine()
    appendLine("services:")
    for (service in services) appendLine(service, tab)
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
    appendLine("volumes", operator = ":", service.volumes, tab)
    appendLine()
}

private fun StringBuilder.appendLine(key: String, operator: String, items: List<Mapping<Any, Any>>, tab: String) {
    if (items.isEmpty()) return
    appendLine("$tab$tab$key:")
    items.forEach { appendLine("$tab$tab${tab}- ${it.outside}${operator}${it.inside}") }
}