package docker.builders

import docker.DockerEnvironment

class VolumeBuilder(name: String, environment: DockerEnvironment) {

    internal val volume = Volume(name + if (environment == DockerEnvironment.Test) "-test" else "")

    class Volume internal constructor(val name: String) {
        internal fun toLines(tab: String) = listOf(
            "$tab$name:",
            "$tab${tab}name: $name",
            "$tab${tab}external: true"
        )

        override fun toString() = name
    }
}