package configuration

import org.gradle.api.DefaultTask
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.OutputFile
import org.gradle.api.tasks.TaskAction

abstract class ClientRunnerTask : DefaultTask() {
    @get:OutputFile
    internal abstract val src: RegularFileProperty

    @get:OutputFile
    internal abstract val dst: RegularFileProperty

    @get:Input
    internal abstract val pkg: Property<String>

    @TaskAction
    fun generate() {
        val raw = src.get().asFile.readText()
        dst.get().asFile.writeText(content(raw))
    }

    /**
     * import kotlinx.serialization.json.Json
     * import majestic.config.ClientConfig
     *
     * private val serializer by lazy {
     *     Json {
     *         ignoreUnknownKeys = true
     *     }
     * }
     *
     * fun configuration(): ClientConfig = serializer.decodeFromString(ClientConfig.serializer(), json)
     */
    private fun content(raw: String) = buildString {
        appendLine("package ${pkg.get()}")
        appendLine()
        appendLine("import kotlinx.serialization.json.Json")
        appendLine("import majestic.config.ClientConfig")
        appendLine()
        appendLine("private val json = \"\"\"")
        appendLine(raw)
        appendLine("\"\"\"")
        appendLine()
        appendLine(
            """
            private val serializer by lazy {
                Json {
                    ignoreUnknownKeys = true
                }
            }
            
            fun configuration(): ClientConfig = serializer.decodeFromString(ClientConfig.serializer(), json)
        """.trimIndent()
        )
    }
}