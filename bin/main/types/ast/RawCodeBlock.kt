package types.ast

data class RawCodeBlock(
    val namespace: String,
    val body: List<String>
) {
    override fun toString() = buildString {
        appendLine()
        appendLine("./$namespace.d.ts")
        body.forEach { appendLine(it) }
    }
}