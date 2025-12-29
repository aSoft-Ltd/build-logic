package dockeris.registries

class DockerisRegistry(
    val name: String,
    val url: String,
    val user: String,
    val pass: String,
    val workdir: String,
) {
    val domain by lazy { url.split("//").lastOrNull() ?: url }
}