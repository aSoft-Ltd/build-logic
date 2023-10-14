package docker.models

import docker.DockerEnvironment
import docker.DockerEnvironment.*

class Volume(val name: String) {
    internal fun copy(env: DockerEnvironment) = when (env) {
        Test -> Volume("$name-${env.suffix.lowercase()}")
        Prod -> this
    }
}