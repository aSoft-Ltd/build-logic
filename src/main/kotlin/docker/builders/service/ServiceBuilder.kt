package docker.builders.service

import docker.models.Mapping
import docker.models.Service
import docker.models.Volume

abstract class ServiceBuilder(val name: String) {
    protected val ports = mutableListOf<Mapping<Int, Int>>()

    protected var restart: String? = null

    fun restart(value: String) {
        restart = value
    }

    protected val volumes = mutableListOf<Mapping<Volume, String>>()

    fun volumes(vararg mappings: Pair<Volume, String>) {
        volumes.addAll(mappings.map { (k, v) -> Mapping(k, v) })
    }

    fun port(outside: Int, inside: Int) = ports.add(Mapping(outside, inside))

    protected val environments = mutableListOf<Mapping<String, Any>>()
    fun environment(vararg variables: Pair<String, Any>) {
        environments.addAll(variables.map { (k, v) -> Mapping(k, v) })
    }

    protected val dependencies = mutableListOf<Service<*>>()

    fun dependsOn(vararg services: Service<*>) = dependencies.addAll(services)

    abstract fun build(): Service<*>
}