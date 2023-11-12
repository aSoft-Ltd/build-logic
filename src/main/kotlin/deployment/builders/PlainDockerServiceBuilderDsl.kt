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
    private val dependencies = mutableListOf<String>()
    private val exposes = mutableListOf<Int>()
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

    fun expose(vararg ports: Int) = exposes.addAll(ports.asIterable())

    fun environment(env: String, value: Any) = environments.add(Mapping(env, value))

    fun environment(vararg mappings: Pair<String, Any>) = mappings.forEach { (env, value) ->
        environments.add(Mapping(env, value))
    }

    fun port(outside: Int, inside: Int) = ports.add(Mapping(outside, inside))

    fun volume(outside: String, inside: String) = volumes.add(Mapping(outside, inside))

    fun volume(vararg mapping: Pair<String, String>) = mapping.forEach { (outside, inside) ->
        volumes.add(Mapping(outside, inside))
    }

    fun volume(forward: String) = volume(forward, forward)

    fun dependsOn(vararg services: String) = dependencies.addAll(services.asIterable())

    fun build() = PlainDockerService(name, image ?: "", restart, privileged, exposes, ports, environments, dependencies, volumes)
}