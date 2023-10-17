package types

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.InputDirectory
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.OutputFile
import org.gradle.api.tasks.TaskAction
import org.gradle.api.tasks.Input
import org.gradle.api.model.ObjectFactory
import org.gradle.api.provider.Provider
import org.gradle.api.provider.Property
import org.gradle.api.provider.MapProperty
import org.gradle.api.provider.ListProperty
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.file.Directory
import java.io.File

abstract class PurifyTypesTask : DefaultTask() {

    companion object {
        val DEFAULT_OUTPUT_FILENAME = "index.d.ts"

        val DEFAULT_DIRECTORY = "packages/js"

        val DEFAULT_LINES_TO_BE_REPLACED = listOf(
            "component", "_init_", "factory", "hashCode()", "toString",
            "copy(", "equals", "serializer()", "descriptor: kotlinx.", "static from_property",
            "doNotUseIt", "**/> */", "_ignore_", "constructor", " config", "getValue(thisRef",
            "readonly __doNotUseOrImplementIt:", "protected "
        )

        val DEFAULT_CODE_TO_BE_REPLACED = listOf(
            "abstract class" to "abstract_class",
            "abstract " to "",
            "abstract_class" to "abstract class",
            "??:" to "?:",
            "value?: Nullable" to "value: Nullable"
        )

        val DEFAULT_CODE_BLOCKS_TO_BE_REMOVED = listOf(
            "static get Companion(): {",
            "static get ${'$'}serializer(): {",
            "export namespace authenticator.events {",
            "class ${'$'}serializer<",
            "readonly __doNotUseOrImplementIt: {"
        )
    }

    @get:InputDirectory
    val directory: DirectoryProperty = project.objects.directoryProperty()

    @get:Input
    abstract val linesToBeRemoved: ListProperty<String>

    @get:Input
    abstract val codeToBeReplaced: ListProperty<Pair<String, String>>

    @get:Input
    abstract val codeblocksToBeRemoved: ListProperty<String>

    @get:OutputFile
    abstract val outputFile: RegularFileProperty

    @get:InputFile
    abstract val inputFile: RegularFileProperty

    @get:Input
    abstract val cleanSrcMap: Property<Boolean>

    @get:Input
    abstract val imports: ListProperty<String>

    init {
        directory.convention(project.layout.buildDirectory.dir(DEFAULT_DIRECTORY))
        linesToBeRemoved.convention(DEFAULT_LINES_TO_BE_REPLACED)
        codeToBeReplaced.convention(DEFAULT_CODE_TO_BE_REPLACED)
        codeblocksToBeRemoved.convention(DEFAULT_CODE_BLOCKS_TO_BE_REMOVED)
        outputFile.convention(directory.file(DEFAULT_OUTPUT_FILENAME))
        inputFile.convention(directory.file(DEFAULT_OUTPUT_FILENAME))
        imports.convention(mutableListOf())
        cleanSrcMap.convention(true)
    }

    @TaskAction
    fun process() {
        val lines = inputFile.asFile.get().readLines()

        var linesWithRemovedCodeBlocks = lines
        for (block in codeblocksToBeRemoved.get()) {
            linesWithRemovedCodeBlocks = removeCodeBlock(linesWithRemovedCodeBlocks, block)
        }

        val filteredLines = linesWithRemovedCodeBlocks.filter { line ->
            !linesToBeRemoved.get().any { content -> line.contains(content) }
        }.map {
            changeNullables(it)
        }

        var replacedLines = filteredLines
        for (pair in codeToBeReplaced.get()) {
            replacedLines = replacedLines.map { replace(it, pair) }
        }

        outputFile.get().asFile.apply {
            delete()
            createNewFile()
            imports.get().forEach { appendText("$it\n") }
            appendText("\n\n")
            replacedLines.forEach { appendText("$it\n") }
        }

        if (cleanSrcMap.get()) directory.get().asFile.listFiles()?.forEach {
            if (it.name.endsWith(".map")) it?.delete()
        }
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

    fun import(vararg definitions: String): Imports = Imports(definitions)

    fun cleanSrcMaps(value: Boolean = true) {
        cleanSrcMap.set(value)
        cleanSrcMap.finalizeValue()
    }

    infix fun Imports.from(module: String) {
        imports.add(definitions.joinToString(prefix = "import { ", separator = ", ", postfix = " } from '$module'"))
    }

    private fun removeCodeBlock(lines: List<String>, block: String): List<String> {
        val blocks = mutableListOf<String>()
        var index = 0
        while (index < lines.size) {
            val line = lines[index]
            if (line.contains(block)) {
                var subBlockCount = 0
                while (true) {
                    index++
                    if (lines[index].contains("{")) subBlockCount++
                    if (lines[index].contains("}") && subBlockCount == 0) break
                    if (lines[index].contains("}")) subBlockCount--
                }
            } else {
                blocks.add(line)
            }
            index++
        }
        return blocks
    }
}