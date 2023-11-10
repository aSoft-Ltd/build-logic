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
        if (hasComment()) return removeComments().checkImports()
        if (!contains(".")) return reactImports()
        if (contains("=>") && !contains("extends")) {
            return if (contains("get ")) { // property function
                substringAfter(": ").substringBefore(";").tokenImportCheck()
            } else { // high order function
                // initialize(onSuccess: (p0: sentinel.UserSession, p1: tmp.Joke<P,thing.Foo>) => void): void;
                val args = substringAfter(": (")
                    .substringBefore(") =>")
                val result = substringAfter("=> ").substringBefore(")")

                var rest = replace(": ($args) => $result)", ": Lambda)")
                if (rest == this) { // avoid stackoverflow
                    rest = ""
                }
                (args.extractLambdaArgs().flatMap { it.tokenImportCheck() } + result.tokenImportCheck() + rest.checkImports()).toSet()
            }
        }

        if (contains(": ")) { // type
            return split(": ").map {
                if (contains("readonly")) {
                    it.substringAfter("(").substringBefore(")")
                } else if (contains("get ")) { // property getter
                    it.substringAfter(": ")
                        .substringBefore(";")
                        .substringAfter("(")
                        .substringBefore(")")
                } else {
                    it.substringBefore(", ")
                        .substringAfter("(")
                        .substringBefore(")")
                }
            }.flatMap {
                it.split(" & ")
            }.map {
                it.substringBefore(";")
            }.flatMap {
                it.tokenImportCheck()
            }.toSet() + reactImports()
        }

        if (contains("} & ")) { // end of a const block
            return substringAfter("} & ").substringBefore(";").split(" & ").flatMap {
                it.tokenImportCheck()
            }.toSet()
        }

        return split("extends ").flatMap {
            it.split("implements ")
        }.flatMap {
            it.split(", ")
        }.flatMap {
            it.split("<")
        }.flatMap {
            it.split(">")
        }.flatMap {
            it.substringBefore(">")
                .substringBefore(" {")
                .tokenImportCheck()
        }.toSet() + reactImports()
    }

    private fun String.tokenImportCheck(): Set<Import> {
        if (contains("=>")) {
            val splits = split("=>")
            val args = splits[0].substringAfter("(").substringBefore(")")
                .extractLambdaArgs()
            val res = splits[1]
            return args.flatMap { it.tokenImportCheck() }.toSet() + res.tokenImportCheck()
        }

        if (!contains(".")) return emptySet()

        // kase.Progress
        if (!contains("<")) {
            val splits = split(".")
            val identifier = splits.last()
            val from = splits - identifier
            val import = Import(
                identifier = identifier.removeTrailing(";", ">", " "),
                qualifier = from.joinToString(".") { it.replace("typeof ", "") }
            )
            return setOf(import)
        }

        if (contains("<") && !contains(">")) {
            return substringBefore("<").tokenImportCheck()
        }

        val inner = substringAfterLast("<").substringBefore(">")
        val innerTokens = inner.split(", ")
        val outer = replace("<$inner>", "")
        return (innerTokens.flatMap { it.tokenImportCheck() } + outer.tokenImportCheck()).toSet()
    }

    private fun String.reactImports() = buildSet<Import> {
        if (this@reactImports.contains("FC")) {
            add(Import("FC", "react", external = true))
        }
        if (this@reactImports.contains(" Props")) {
            add(Import("Props", "react", external = true))
        }
        if (this@reactImports.contains("ReactNode")) {
            add(Import("ReactNode", "react", external = true))
        }
    }

    private fun String.hasComment() = contains("/*") && contains("*/")
    private fun String.removeComments(): String {
        if (!hasComment()) return this

        val comment = substringAfter("/*").substringBefore("*/")
        return replace("/*$comment*/", "").removeComments()
    }

    private fun String.extractLambdaArgs() = split(": ").flatMap {
        it.split(", ")
    }.flatMap {
        it.split("<")
    }.flatMap {
        it.split(">")
    }

    private fun String.removeTrailing(vararg texts: String): String {
        var out = this
        texts.forEach {
            out = out.replace(it, "")
        }
        return out
    }
}