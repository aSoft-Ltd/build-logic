package types.tasks

import org.gradle.api.DefaultTask
import org.gradle.api.file.RegularFile
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.provider.ListProperty
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.OutputFile
import org.gradle.api.tasks.TaskAction

abstract class RemoveLinesTask : DefaultTask() {


    @get:InputFile
    abstract val input: RegularFileProperty

    @get:OutputFile
    val output: Provider<RegularFile> = project.layout.buildDirectory.file("typescript/intermediaries/removed-lines.d.ts")

    @get:Input
    abstract val lines: ListProperty<String>

    init {
        lines.convention(
            listOf(
                "component", "_init_", "factory", "hashCode()", "toString",
                "copy(", "equals", "serializer()", "descriptor: kotlinx.", "static from_property",
                "doNotUseIt", "**/> */", "_ignore_", "constructor", "getValue(thisRef",
                "readonly __doNotUseOrImplementIt:", "protected "
            )
        )
    }

    @TaskAction
    fun remove() {
        val code = input.get().asFile.readLines()
        val croocked = code.filter { line ->
            !lines.get().any { content -> line.contains(content) }
        }

        var result = croocked
//        val replacements = listOf(
//            "abstract class" to "abstract_class",
//            "abstract " to "",
//            "abstract_class" to "abstract class",
//            "??:" to "?:",
//            "value?: Nullable" to "value: Nullable"
//        )
//        for (pair in replacements) {
//            result = result.map { replace(it, pair) }
//        }
        output.get().asFile.writeText(croocked.joinToString("\n"))
    }

    private fun replace(line: String, pair: Pair<String, String>): String {
        if (!line.contains(pair.first)) return line
        return line.replace(pair.first, pair.second)
    }
    private fun changeNullables(line: String): String {
        if (!line.contains(": Nullable<")) return line
        val stage1 = line.replace(": Nullable<", "?: Nullable<")
        return stage1.replace(")?: Nullable<", "): Nullable<")
    }
}