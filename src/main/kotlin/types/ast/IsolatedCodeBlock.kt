package types.ast

data class IsolatedCodeBlock(
    val namespace: String,
    val identifier: String,
    val body: List<String>,
) {
    override fun toString() = buildString {
        appendLine()
        appendLine("./$namespace/$identifier.d.ts")
        body.forEach { appendLine(it) }
    }
}