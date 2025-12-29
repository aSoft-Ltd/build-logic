package dockeris.services

import dockeris.DockerisContext
import dockeris.images.Image
import dockeris.services.DockerisServiceBuilder.Dependency
import dockeris.services.DockerisServiceBuilder.HealthCheck
import dockeris.services.DockerisServiceBuilder.HealthTest

class DockerisServiceTemplate(
    var name: String,
    val image: Image,
    val restart: String?,
    val environments: Map<String, String>,
    val ports: List<Pair<Int, Int>>,
    val check: HealthCheck?,
    val dependencies: Collection<Dependency>,
    val volumes: List<Pair<String, String>>
) {
    fun toDockerComposeFile(context: DockerisContext, tab: String, depth: Int) = buildString {
        val padding1 = tab.repeat(depth)
        appendLine("${padding1}$name:")
        val padding2 = tab.repeat(depth + 1)
        appendLine("${padding2}image: ${image.toQualifiedName(context)}")
        if (restart != null) appendLine("${padding2}restart: $restart")
        appendPortsVariablesAndVolumes(tab, depth)
        appendDependencies(tab, depth)
        appendHealthCheck(tab, depth)
    }

    fun toDockerStackComposeFile(domain: String, tab: String, depth: Int) = buildString {
        val padding1 = tab.repeat(depth)
        appendLine("${padding1}$name:")
        val padding2 = tab.repeat(depth + 1)
        val label = (if (image is Image.Unpublished) "$domain/" else "") + "${image.name}:${image.version}"
        appendLine("${padding2}image: $label")
        appendPortsVariablesAndVolumes(tab, depth)
        appendDependencies(tab, depth)
        appendHealthCheck(tab, depth)
    }

    private fun StringBuilder.appendHealthCheck(tab: String, depth: Int) {
        if (check == null) return
        val padding2 = tab.repeat(depth + 1)
        val padding3 = tab.repeat(depth + 2)
        appendLine("${padding2}healthcheck:")
        val test = when (check.test) {
            is HealthTest.CMD -> """["CMD", "${check.test.command}"]"""
            is HealthTest.CMD_SHELL -> """["CMD-SHELL", "${check.test.command}"]"""
        }
        appendLine("${padding3}test: $test")
        appendLine("${padding3}interval: ${check.interval.inWholeSeconds}s")
        appendLine("${padding3}timeout: ${check.timeout.inWholeSeconds}s")
        appendLine("${padding3}start_period: ${check.delay.inWholeSeconds}s")
        appendLine("${padding3}retries: ${check.retries}")
    }

    private fun StringBuilder.appendPortsVariablesAndVolumes(tab: String, depth: Int) {
        val padding2 = tab.repeat(depth + 1)
        val padding3 = tab.repeat(depth + 2)
        if (ports.isNotEmpty()) {
            appendLine("${padding2}ports:")
            ports.forEach { (outside, inside) ->
                appendLine("${padding3}- $outside:$inside")
            }
        }
        if (environments.isNotEmpty()) {
            appendLine("${padding2}environment:")
            environments.forEach { (key, value) ->
                appendLine("${padding3}- $key=$value")
            }
        }
        if (volumes.isNotEmpty()) {
            appendLine("${padding2}volumes:")
            volumes.forEach { (outside, inside) ->
                appendLine("${padding3}- $outside:$inside")
            }
        }
    }


    private fun StringBuilder.appendDependencies(tab: String, depth: Int) {
        if (dependencies.isEmpty()) return
        val padding1 = tab.repeat(depth + 1)
        val padding2 = tab.repeat(depth + 2)
        val padding3 = tab.repeat(depth + 3)
        appendLine("${padding1}depends_on:")
        dependencies.forEach { dependency ->
            appendLine("${padding2}${dependency.service}:")
            appendLine("${padding3}condition: ${dependency.condition.value}")
        }
    }
}