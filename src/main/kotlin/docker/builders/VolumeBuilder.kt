package docker.builders

class VolumeBuilder(name: String) {

    internal val volume = Volume(name, external = false)

    fun external(value: Boolean = true) {
        volume.external = value
    }

    class Volume internal constructor(val name: String, var external: Boolean) {
        internal fun toLines(tab: String, externalVolume: Boolean) = listOf(
            "$tab$name:",
            "$tab${tab}name: $name",
            "$tab${tab}external: ${external && externalVolume}"
        )

    }
}