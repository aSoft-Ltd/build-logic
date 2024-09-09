package dockeris.services

import dockeris.DockerisContext
import dockeris.images.Image

class DockerisServiceTemplate(
    var name: String,
    val image: Image,
    val restart: String?,
    val environments: Map<String, String>,
    val ports: List<Pair<Int, Int>>,
    val volumes: List<Pair<String, String>>
) {
    fun toDockerComposeFile(context: DockerisContext, tab: String, depth: Int) = buildString {
        val padding1 = tab.repeat(depth)
        appendLine("${padding1}$name:")
        val padding2 = tab.repeat(depth + 1)
        appendLine("${padding2}image: ${image.toQualifiedName(context)}")
        if (restart != null) appendLine("${padding2}restart: $restart")
        appendPortsVariablesAndVolumes(tab, depth)
    }

    fun toDockerStackComposeFile(context: DockerisContext, domain: String, tab: String, depth: Int) = buildString {
        val padding1 = tab.repeat(depth)
        appendLine("${padding1}$name:")
        val padding2 = tab.repeat(depth + 1)
        val label = (if (image is Image.Unpublished) "$domain/" else "") + image.toQualifiedName(context)
        appendLine("${padding2}image: $label")
        appendPortsVariablesAndVolumes(tab, depth)
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
}