package types.ast

internal data class ResolvedCodeBlock(
    val namespace: String,
    val imports: Set<Import>,
    val identifier: String,
    val body: List<String>,
) {
    override fun toString() = buildString {
        appendLine()
        appendLine("./$namespace/$identifier.d.ts")
        appendLine(toCode())
    }

    fun toCode() = buildString {
        appendLine("/* This is generated code. Do not manually edit this file */")
        imports.filterNot {
            it.from.endsWith("$namespace/$identifier")
        }.forEach {
            appendLine("""import type { ${it.identifier} } from '${it.from}'""")
        }
        if (imports.isNotEmpty()) appendLine()
        appendLine("""type Nullable<T> = T | null | undefined""")
        appendLine()
        body.forEach { appendLine(it) }
    }
}