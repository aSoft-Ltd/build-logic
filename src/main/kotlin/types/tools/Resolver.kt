package types.tools

import types.ast.Import
import types.ast.IsolatedCodeBlock
import types.ast.ResolvedCodeBlock

internal class Resolver {
    fun resolve(blocks: List<IsolatedCodeBlock>) = blocks.map { resolve(it) }
    fun resolve(block: IsolatedCodeBlock): ResolvedCodeBlock {
        val lines = block.body.subList(1, block.body.lastIndex)
        val importsSet = mutableSetOf<Import>()
        val body = lines.mapIndexed { idx, it ->
            val imports = it.checkImports()
            if (imports.isNotEmpty()) {
                importsSet.addAll(imports)
            }
            var res = it
            imports.forEach { import ->
                res = res.replace("${import.qualifier}.${import.identifier}", import.identifier)
            }
            (if (idx == 0) "export " else "") + res.replaceFirst("    ", "")
        }
        return ResolvedCodeBlock(
            namespace = block.namespace,
            imports = importsSet,
            identifier = block.identifier,
            body = body
        )
    }

    private fun String.checkImports(): Set<Import> {
        if (!contains(".")) return emptySet()
        if (contains("=")) return emptySet()

        if (contains(": ")) { // type
            return split(": ").flatMap {
                it.substringBefore(")")
                    .substringBefore(";")
                    .tokenImportCheck()
            }.toSet()
        }

        if (contains("} & ")) { // end of a const block
            return substringAfter("} & ").substringBefore(";").tokenImportCheck()
        }

        return split("extends ").flatMap {
            it.split("implements ")
        }.flatMap {
            it.substringBefore(">")
                .substringBefore(",")
                .substringBefore(" {")
                .tokenImportCheck()
        }.toSet()
    }

    private fun String.tokenImportCheck(): Set<Import> {
        if (!contains(".")) return emptySet()
        if (indexOf(".") in indexOf("/*")..indexOf("*/")) return emptySet()

        // kase.Progress
        if (!contains("<")) {
            val splits = split(".")
            val identifier = splits.last()
            val from = splits - identifier
            return setOf(Import(identifier, from.joinToString(".") { it.replace("typeof ", "") }))
        }

        if (contains("<") && !contains(">")) {
            return substringBefore("<").tokenImportCheck()
        }

        val inner = substringAfterLast("<").substringBefore(">")
        val innerTokens = inner.split(", ")
        val outer = replace("<$inner>", "")
        return (innerTokens.flatMap { it.tokenImportCheck() } + outer.tokenImportCheck()).toSet()
    }
}