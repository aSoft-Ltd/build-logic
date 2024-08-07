package dockate.tasks

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
        val url = registry.get()
        if (url.startsWith("https")) return // No need to allow insecure-registries for secure registries
        val file = File("/etc/docker/daemon.json")
        if (!file.exists()) {
            file.createNewFile()
        }
        val content = url.split("//").lastOrNull() ?: url
        file.writeText(
            """
            {
                "insecure-registries" : [ "$content" ]
            }
            """.trimIndent()
        )
    }
}