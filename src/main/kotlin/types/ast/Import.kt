package types.ast

internal data class Import(val identifier: String, val qualifier: String) {
    val from by lazy {
        val levels = qualifier.split(".").size
        "../".repeat(levels) + qualifier.replace(".", "/") + "/$identifier"
    }
}