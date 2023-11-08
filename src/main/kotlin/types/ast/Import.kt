package types.ast

internal data class Import(val identifier: String, val qualifier: String) {
    fun from(namespace: String) : String {
        val levels = namespace.split(".").size
        return "../".repeat(levels) + qualifier.replace(".", "/") + "/$identifier"
    }
}