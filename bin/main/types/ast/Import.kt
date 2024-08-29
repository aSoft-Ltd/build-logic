package types.ast

internal data class Import(val identifier: String, val qualifier: String, val external: Boolean = false) {
    fun from(namespace: String): String = if (external) {
        qualifier
    } else {
        val levels = namespace.split(".").size
        "../".repeat(levels) + qualifier.replace(".", "/") + "/$identifier"
    }
}