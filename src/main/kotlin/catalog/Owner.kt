package catalog

data class Owner(val uid: Int, val name: String) {
    fun capitalized() = name.replaceFirstChar { it.uppercase() }
}

object Owners {
    val asoft by lazy { Owner(1,"asoft") }
}