package dockeris.tooling

open class UniversalTextFileBuilder {
    internal val lines = mutableListOf<() -> String>()

    operator fun String.unaryPlus() {
        lines.add { this }
    }

    operator fun String.unaryMinus() {
        lines.add { this }
    }

    fun blankline() {
        lines.add { "" }
    }

    fun build() = buildString { lines.forEach { appendLine(it()) } }
}