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

abstract class RemoveCodeBlockTask : DefaultTask() {


    @get:InputFile
    abstract val input: RegularFileProperty

    @get:OutputFile
    val output: Provider<RegularFile> = project.layout.buildDirectory.file("typescript/intermediaries/removed-code-blocks.d.ts")

    @get:Input
    abstract val blocks: ListProperty<String>

    init {
        blocks.convention(
            listOf(
                "static get ",
                "export namespace authenticator.events {",
                "class ${'$'}serializer<",
                "readonly __doNotUseOrImplementIt: {"
            )
        )
    }

    @TaskAction
    fun remove() {
        var result = input.get().asFile.readLines()
        for (block in blocks.get()) {
            result = removeCodeBlock(result, block)
        }
        output.get().asFile.writeText(result.joinToString("\n"))
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