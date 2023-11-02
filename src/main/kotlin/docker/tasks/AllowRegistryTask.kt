package docker.tasks

import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.TaskAction

abstract class AllowRegistryTask : DefaultTask() {

    @get:Input
    abstract val registry: Property<String>

    @TaskAction
    fun allow() {
        File("/etc/docker/daemon.json").also {
            if (!it.exists()) it.createNewFile()
            it.writeText(
                """
                {
                    "insecure-registries" : [ "${registry.get()}" ]
                }
            """.trimIndent()
            )
        }
    }
}