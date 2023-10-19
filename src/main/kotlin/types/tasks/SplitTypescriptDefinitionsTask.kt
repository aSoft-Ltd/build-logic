package types.tasks

import java.io.File
import org.gradle.api.DefaultTask
import org.gradle.api.file.Directory
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

abstract class SplitTypescriptDefinitionsTask : DefaultTask() {

    @get:InputFile
    abstract val input: RegularFileProperty

    @get:OutputDirectory
    val output: Provider<Directory> = project.layout.buildDirectory.dir("typescript/output")

    class DeclarationFile(
        val imports: MutableList<String> = mutableListOf(),
        val lines: MutableList<String> = mutableListOf()
    )

    @TaskAction
    fun split() {
        val dir = File(output.get().asFile, "types").apply { mkdir() }
        val namespaces = detectNameSpaceCodeBlocks(input.get().asFile.readLines())
        namespaces.forEach { (namespace, code) ->
            val subDir = File(dir, namespace).apply { mkdir() }
            val file = File(subDir, "$namespace.d.ts").apply { createNewFile() }
            val imports = code.imports.filter {
                it != namespace && it in namespaces.keys
            }.toSet().map { """import { $it } from '../$it/$it'""" }

            val top = ((if (imports.isNotEmpty()) imports + listOf("") else emptyList()) + listOf(
                "type Nullable<T> = T | null | undefined",
                ""
            )).joinToString("\n")

            val body = code.lines.joinToString("\n") // .replace("}\nexport declare namespace $namespace {", "")

            file.writeText("$top\n$body")
        }
    }

    private fun detectNameSpaceCodeBlocks(lines: List<String>): Map<String, DeclarationFile> {
        val out = mutableMapOf<String, DeclarationFile>()
        var index = 0
        while (index < lines.size) {
            val line = lines[index]
            if (line.startsWith("export declare namespace ")) {
                var name = line.split("export declare namespace ").last().replace(" {", "")
                name = name.split(".").firstOrNull() ?: name
                val code = out.getOrPut(name) { DeclarationFile() }
                code.lines.add(line)
                var opening = 1
                while (true) {
                    index++
                    val l = lines[index]
                    l.checkImports().forEach { code.imports.add(it.namespace) }
                    if (l.contains("{") && l.contains("}")) {
                        code.lines.add(l)
                        index++
                    } else if (l.contains("{")) {
                        opening++
                        code.lines.add(l)
                    } else if (l.contains("}")) {
                        opening--
                        code.lines.add(l)
                        if (opening == 0) break
                    } else {
                        code.lines.add(l)
                    }
                }
            }
            index++
        }
        return out
    }


    private data class ImportCheck(val namespace: String)

    private fun String.checkImports(): Set<ImportCheck> {
        if (!contains(".")) return emptySet()
        if (contains("=")) return emptySet()

        if (contains(": ")) { // type
            return split(": ").flatMap { it.tokenImportCheck() }.toSet()
        }

        val extends = split("extends ").lastOrNull() ?: return emptySet()

        return extends.split(" ,").flatMap { it.tokenImportCheck() }.toSet()
    }

    private fun String.tokenImportCheck(): Set<ImportCheck> {
        if (!contains(".")) return emptySet()

        // kase.Progress
        if (!contains("<")) {
            val namespace = split(".").first()
            return setOf(ImportCheck(namespace))
        }

        val inner = substringAfterLast("<").substringBefore(">")
        val innerTokens = inner.split(", ")
        val outer = replace("<$inner>", "")
        return (innerTokens.flatMap { it.tokenImportCheck() } + outer.tokenImportCheck()).toSet()
    }
}