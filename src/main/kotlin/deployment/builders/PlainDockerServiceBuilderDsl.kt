package deployment.builders

import docker.models.Mapping

class PlainDockerServiceBuilderDsl(
    private val name: String
) {
    private var restart: String? = null

    private var image: String? = null
    private var privileged: Boolean? = null
    private val environments = mutableListOf<Mapping<String, Any>>()
    private val ports = mutableListOf<Mapping<Int, Int>>()
    private val volumes = mutableListOf<Mapping<String, String>>()

    fun restart(value: String) {
        restart = value
    }

    fun image(value: String) {
        image = value
    }

    fun privileged() {
        privileged = true
    }

    fun environment(env: String, value: Any) = environments.add(Mapping(env, value))
    fun port(outside: Int, inside: Int) = ports.add(Mapping(outside, inside))

    fun volume(outside: String, inside: String) = volumes.add(Mapping(outside, inside))

    fun volume(forward: String) = volume(forward, forward)

    fun build() = PlainDockerService(name, image ?: "", restart, privileged, ports, environments, volumes)
}