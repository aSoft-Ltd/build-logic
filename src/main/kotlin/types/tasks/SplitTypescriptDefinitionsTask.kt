package types.tasks

import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.file.Directory
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction
import types.ast.ResolvedCodeBlock
import types.tools.Isolator
import types.tools.Parser
import types.tools.Resolver

abstract class SplitTypescriptDefinitionsTask : DefaultTask() {

    @get:InputFile
    abstract val input: RegularFileProperty

    @get:OutputDirectory
    val output: Provider<Directory> = project.layout.buildDirectory.dir("typescript/definitions")

    @TaskAction
    fun split() {
        val definitions = output.get().asFile
        definitions.deleteRecursively()
        val blocks = Parser().parse(input.asFile.get())
        val isolated = Isolator().isolate(blocks)
        val resolved = Resolver().resolve(isolated) + ResolvedCodeBlock(
            namespace = "utils",
            imports = emptySet(),
            identifier = "Nullable",
            body = listOf("export type Nullable<T> = T | undefined | null")
        )
        resolved.forEach {
            val file = File(definitions,"./${it.path}/${it.identifier}.d.ts")
            file.parentFile.mkdirs()
            file.createNewFile()
            file.writeText(it.toCode())
        }
        definitions.listFiles()?.forEach { it.finalizeTopLevelExports() }
    }

    private fun File.finalizeTopLevelExports() {
        val content = listFiles()?.filterNot {
            it.name.contains("index.")
        } ?: return
        val index = File(this, "index.ts")
        index.createNewFile()
        index.writeText("/* generated index file */\n")
        content.forEach {
            val text = if (it.isDirectory) {
                "export * from './${it.name}'"
            } else {
                val name = it.name.replace(".d.ts", "")
                "export type { $name } from './$name'"
            }
            index.appendText("$text\n")
        }
        content.forEach { if (it.isDirectory) it.finalizeTopLevelExports() }
    }
}