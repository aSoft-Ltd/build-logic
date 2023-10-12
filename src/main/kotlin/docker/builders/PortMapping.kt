package docker.builders

data class PortMapping(
    val inside: Int,
    val outside: Int
)