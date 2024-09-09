package dockeris.tooling

import dockeris.DockerisContext

open class TextFileBuilder {
    internal val lines = mutableListOf<(DockerisContext) -> String>()
    operator fun String.unaryPlus() {
        lines.add { this }
    }

    operator fun String.unaryMinus() {
        lines.add { this }
    }

    fun blankline() {
        lines.add { "" }
    }

    fun build(context: DockerisContext) = buildString { lines.forEach { appendLine(it(context)) } }
}