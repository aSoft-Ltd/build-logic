package dockeris.images

class DockerisUniversalImageTemplate(
    val name: String,
    val version: String,
    val platforms: List<String>,
    val builder: DockerisUniversalImageBuilder
)