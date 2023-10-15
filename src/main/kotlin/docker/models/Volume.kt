package docker.models

class Volume(val name: String) {
    internal fun copy(env: RunningEnvironment) = Volume("$name-${env.name.lowercase()}")
}