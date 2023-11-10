package types.tools

import java.io.File
import types.ast.RawCodeBlock

class Parser {
    fun parse(file: File): List<RawCodeBlock> {
        val blocks = mutableListOf<RawCodeBlock>()
        val lines = file.readLines()
        val size = lines.size
        var i = 0
        while (i < size) {
            val line = lines[i]
            if (line.startsWith("export declare namespace ")) {
                val namespace = line.substringAfter("export declare namespace ").substringBefore(" {")
                val body = lines.subList(i, size).chopCodeBlock()
                i += body.size
                val block = RawCodeBlock(
                    namespace = namespace,
                    body = body
                )
                blocks.add(block)
            } else {
                i++
            }
        }
        return blocks
    }
}