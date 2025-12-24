package catalog

enum class RunningEnvironment {
    production, staging, development;

    fun capitalized() = name.replaceFirstChar { it.uppercase() }
}