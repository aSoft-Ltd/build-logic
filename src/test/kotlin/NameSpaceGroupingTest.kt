import java.io.File
import org.junit.Test

class NameSpaceGroupingTest {

    val dir = File("/media/andylamax/Auxilliary/Workspace/PiCortex/home/build-logic/src/test/resources")

    @Test
    fun should_be_able_to_at_least_detect_code_blocks() {
        val namespaces = detectNameSpaceCodeBlocks(index.lines())
        namespaces.forEach { t, u ->
            val file = File(dir, "types/$t.d.ts")
            file.createNewFile()
            val imports = u.imports.filter {
                it != t && it in namespaces.keys
            }.toSet().joinToString("\n") { """import { $it } from './$it'""" }
            val body = u.lines.joinToString("\n").replace("}\nexport declare namespace $t {", "")
            if (imports.isBlank()) file.writeText(body) else file.writeText("$imports\n\n$body")
        }
    }

    class DeclarationFile(
        val imports: MutableList<String> = mutableListOf(),
        val lines: MutableList<String> = mutableListOf()
    )

    fun detectNameSpaceCodeBlocks(lines: List<String>): Map<String, DeclarationFile> {
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
                    val ic = l.checkImport()
                    if (ic.exists) {
                        code.imports.add(ic.namespace ?: "")
                    }
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


    data class ImportCheck(val namespace: String?) {
        val exists = namespace != null
    }

    fun String.checkImport(): ImportCheck {
        if (contains(": ") && contains(".") && !contains("=")) {
            return ImportCheck(split(": ").lastOrNull()?.split(".")?.firstOrNull())
        } else if (contains("extends ") && contains(".") && !contains("=")) {
            return ImportCheck(split("extends ").lastOrNull()?.split(".")?.firstOrNull())
        }
        return ImportCheck(null)
    }
}