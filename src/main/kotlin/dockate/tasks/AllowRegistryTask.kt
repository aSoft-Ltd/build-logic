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
//        val file = File("/etc/docker/daemon.json")
//        if (!file.exists()) {
//            file.createNewFile()
//        }
//        file.writeText(
//            """
//            {
//                "insecure-registries" : [ "${registry.get()}" ]
//            }
//            """.trimIndent()
//        )
    }
}