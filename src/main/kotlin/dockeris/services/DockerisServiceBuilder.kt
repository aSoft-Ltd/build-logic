package dockeris.services

import dockeris.DockerisExtension
import dockeris.images.DockerisUniversalImageTemplate
import dockeris.images.Image
import dockeris.volumes.DockerisVolume
import kotlin.time.Duration
import kotlin.time.Duration.Companion.seconds

class DockerisServiceBuilder {
    private var name: String? = null
    fun name(value: String) {
        name = value
    }

    private var imageName: String? = null
    private var imageVersion: String? = null
    fun image(name: String, version: String? = null) {
        imageName = name
        imageVersion = version
    }

    fun image(image: Image) {
        imageName = image.name
        imageVersion = image.version
    }

    fun image(img: DockerisUniversalImageTemplate) {
        image(img.name, img.version)
    }

    private var restart: String? = null
    fun restart(value: String) {
        restart = value
    }

    private val ports = mutableListOf<Pair<Int, Int>>()
    fun port(outside: Int, inside: Int) {
        ports.add(outside to inside)
    }

    class HealthCheck(
        val test: HealthTest,
        val interval: Duration,
        val timeout: Duration,
        val delay: Duration,
        val retries: Int
    )

    sealed interface HealthTest {
        data class CMD(val command: String) : HealthTest
        data class CMD_SHELL(val command: String) : HealthTest
    }

    fun CMD(command: String) = HealthTest.CMD(command)
    fun CMD_SHELL(command: String) = HealthTest.CMD_SHELL(command)

    private var healthCheck: HealthCheck? = null

    fun healthCheck(
        test: HealthTest,
        interval: Duration = 10.seconds,
        timeout: Duration = 5.seconds,
        delay: Duration = interval,
        retries: Int = 5
    ) {
        healthCheck = HealthCheck(test, interval, timeout, delay, retries)
    }

    class Dependency(
        val service: String,
        val condition: Condition = Condition.STARTED
    ) {
        enum class Condition(val value: String) {
            STARTED("service_started"),
            HEALTHY("service_healthy"),
            COMPLETED("service_completed_successfully")
        }
    }

    private val dependencies = mutableSetOf<Dependency>()
    fun dependsOn(vararg services: String) {
        dependencies.addAll(services.map { Dependency(it) })
    }

    fun started(service: String) = Dependency(service, Dependency.Condition.STARTED)
    fun healthy(service: String) = Dependency(service, Dependency.Condition.HEALTHY)
    fun completed(service: String) = Dependency(service, Dependency.Condition.COMPLETED)

    fun dependsOn(dependency: Dependency) {
        dependencies.add(dependency)
    }

    private val volumes = mutableListOf<Pair<String, String>>()
    fun volumes(vararg mappings: Pair<String, String>) {
        volumes.addAll(mappings)
    }

    fun volume(v: DockerisVolume, path: String) {
        volumes.add(v.name to path)
    }

    private val environments = mutableMapOf<String, String>()
    fun environment(vararg variables: Pair<String, String>) {
        environments.putAll(variables)
    }

    class EnvironmentBuilder {
        internal val mappings = mutableMapOf<String, String>()
        infix fun String.to(value: String?) {
            mappings[this] = value.toString()
        }
    }

    fun environment(builder: EnvironmentBuilder.() -> Unit) {
        val e = EnvironmentBuilder().apply(builder)
        environments.putAll(e.mappings)
    }

    internal fun build(extension: DockerisExtension) = DockerisServiceTemplate(
        name = name ?: throw IllegalArgumentException("Service name is required"),
        image = run {
            val name = imageName ?: throw IllegalArgumentException("Image name is required")
            val universal = extension.images.find { it.name == name }
            when {
                universal != null -> Image.Unpublished(name, universal.version, universal.platforms)
                else -> Image.Published(name, imageVersion ?: "latest")
            }
        },
        restart = restart,
        ports = ports,
        environments = environments,
        dependencies = dependencies,
        volumes = volumes,
        check = healthCheck
    )
}