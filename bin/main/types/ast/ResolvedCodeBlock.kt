package types.ast

internal data class ResolvedCodeBlock(
    val namespace: String,
    val imports: Set<Import>,
    val identifier: String,
    val body: List<String>,
) {

    val path by lazy { namespace.replace(".", "/") }
    override fun toString() = buildString {
        appendLine()
        appendLine("./$path/$identifier.d.ts")
        appendLine(toCode())
    }

    fun toCode() = buildString {
        appendLine("/* This is generated code. Do not manually edit this file */")
        (imports + Import("Nullable", "utils")).filterNot {
            it.from(namespace).endsWith("$path/$identifier")
        }.forEach {
            appendLine("""import type { ${it.identifier} } from '${it.from(namespace)}'""")
        }
        appendLine()
        body.forEach { appendLine(it) }
    }
}