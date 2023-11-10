package docker.models

data class Mapping<out O, out I>(
    val outside: O,
    val inside: I
)