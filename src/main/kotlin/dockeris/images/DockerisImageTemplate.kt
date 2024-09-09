package dockeris.images

import dockeris.DockerisContext

class DockerisImageTemplate(
    val name: String,
    val version: String,
    val platforms: List<String>,
    val configure: DockerisImageTemplateBuilder.(context: DockerisContext) -> Unit
) {
    private val builders = mutableMapOf<DockerisContext, DockerisImageTemplateBuilder>()

    fun builder(context: DockerisContext) = builders.getOrPut(context) {
        DockerisImageTemplateBuilder().apply {
            configure(context)
        }.also { builders[context] = it }
    }

    fun build(context: DockerisContext) = builder(context).build(context)
}