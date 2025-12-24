package configuration

import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.OutputFile
import org.gradle.api.tasks.TaskAction

abstract class InjectSourceCode : DefaultTask() {
    @get:OutputDirectory
    abstract val dir: DirectoryProperty

    @get:Input
    abstract val file: Property<String>

    @get:Input
    abstract val pkg: Property<String>

    @get:Input
    abstract val code: Property<String>

    @TaskAction
    fun generate() {
        val source = buildString {
            appendLine("package ${pkg.get()}")
            appendLine()
            appendLine(code.get())
        }
        dir.file(file.get()).get().asFile.writeText(source)
    }
}