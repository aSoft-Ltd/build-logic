package catalog

enum class RunningEnvironment {
    prodution, staging, development;

    fun capitalized() = name.replaceFirstChar { it.uppercase() }
}