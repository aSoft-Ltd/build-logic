package docker

enum class DockerEnvironment(internal val suffix: String) {
    Test("Test"), Prod("");
}