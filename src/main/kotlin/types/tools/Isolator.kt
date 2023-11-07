package types.tools

import types.ast.IsolatedCodeBlock
import types.ast.RawCodeBlock

class Isolator(private val excludeFunctions: Boolean = true) {
    fun isolate(blocks: List<RawCodeBlock>): List<IsolatedCodeBlock> = blocks.flatMap { isolate(it) }

    private fun isolate(block: RawCodeBlock): List<IsolatedCodeBlock> {
        val blocks = mutableListOf<IsolatedCodeBlock>()
        val namespace = block.namespace.replace(".", "/")
        val opener = block.body.first()
        val closer = block.body.last()
        val lines = block.body.subList(1, block.body.lastIndex)
        var i = 0
        val size = lines.size
        while (i < size) {
            val line = lines[i]
            if (line.contains("function ") && !excludeFunctions) {
                val identifier = line.substringAfter("function ").substringBefore("(")
                val b = IsolatedCodeBlock(
                    identifier = identifier,
                    namespace = namespace,
                    body = listOf(line)
                )
                i++
                blocks.add(b)
            } else if (line.contains("const ")) {
                val b = getBlock(type = "const", from = lines.subList(i, size))
                i += b.body.size
                blocks.add(b)
            }else if (line.contains("interface ")) {
                val b = getBlock(type = "interface", from = lines.subList(i, size))
                i += b.body.size
                blocks.add(b)
            } else if (line.contains("class ")) {
                val b = getBlock(type = "class", from = lines.subList(i, size))
                i += b.body.size
                blocks.add(b)
            } else {
                i++
            }
        }
        return blocks.map { it.copy(namespace = namespace, body = listOf(opener) + it.body + closer) }
    }

    private fun getBlock(type: String, from: List<String>): IsolatedCodeBlock {
        val line = from.first()
        val identifier = line.substringAfter("$type ")
            .substringBefore(" {")
            .substringBefore(" extends")
            .substringBefore(" implements")
            .substringBefore("<")
            .substringBefore(" /*")
            .substringBefore(":")
        val body = from.chopCodeBlock()
        return IsolatedCodeBlock(
            namespace = "",
            identifier = identifier,
            body = body
        )
    }
}