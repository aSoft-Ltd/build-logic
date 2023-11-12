package docker.models

data class Mapping<out O, out I>(
    val outside: O,
    val inside: I
) {
    fun <R> mapOutside(mapper: (O) -> R) = Mapping(mapper(outside), inside)
}