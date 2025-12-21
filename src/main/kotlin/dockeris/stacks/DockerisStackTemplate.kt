package dockeris.stacks

import dockeris.DockerisContext
import dockeris.services.DockerisServiceTemplate
import dockeris.volumes.DockerisVolume

class DockerisStackTemplate(
    val name: String,
    val version: Double,
    val context: DockerisContext,
    val services: List<DockerisServiceTemplate>,
    val volumes: Collection<DockerisVolume>
) {
    fun toDockerComposeFile(context: DockerisContext) = buildString {
        appendLine("services:")
        val tab = "  "
        services.forEach { service ->
            append(service.toDockerComposeFile(context, tab, 1))
        }
        appendLine("volumes:")
        volumes.forEach { volume ->
            append(volume.toDockerComposeFile(tab, 1))
        }
    }

    fun toDockerStackComposeFile(domain: String) = buildString {
        appendLine("services:")
        val tab = "  "
        services.forEach { service ->
            append(service.toDockerStackComposeFile(domain, tab, 1))
        }
        appendLine("volumes:")
        volumes.forEach { volume ->
            append(volume.toDockerComposeFile(tab, 1))
        }
    }
}