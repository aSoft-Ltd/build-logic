package dockeris.images

import dockeris.DockerisContext

sealed interface Image {
    val name: String
    val version: String

    data class Published(
        override val name: String,
        override val version: String
    ) : Image {
        override fun toQualifiedName(context: DockerisContext) = "$name:$version"
    }

    data class Unpublished(
        override val name: String,
        override val version: String,
        val platforms: List<String>
    ) : Image {
        override fun toQualifiedName(context: DockerisContext) = "${context.owner}-$name-${context.environment}:$version"
    }

    fun toQualifiedName(context: DockerisContext): String
}