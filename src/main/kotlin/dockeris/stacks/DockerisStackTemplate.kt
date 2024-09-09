package dockeris.stacks

import dockeris.DockerisContext
import dockeris.services.DockerisServiceTemplate

class DockerisStackTemplate(
    val name: String,
    val version: Double,
    val context: DockerisContext,
    val services: List<DockerisServiceTemplate>
) {
    fun toDockerComposeFile(context: DockerisContext) = buildString {
        appendLine("services:")
        val tab = "  "
        services.forEach { service ->
            append(service.toDockerComposeFile(context, tab, 1))
        }
    }

    fun toDockerStackComposeFile(domain: String, context: DockerisContext) = buildString {
        appendLine("services:")
        val tab = "  "
        services.forEach { service ->
            append(service.toDockerStackComposeFile(context, domain, tab, 1))
        }
    }
}