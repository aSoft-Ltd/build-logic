package types.tasks

import org.gradle.api.DefaultTask
import org.gradle.api.file.RegularFile
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.OutputFile
import org.gradle.api.tasks.TaskAction

abstract class ReturnOptionalsTask : DefaultTask() {


    @get:InputFile
    abstract val input: RegularFileProperty

    @get:OutputFile
    val output: Provider<RegularFile> = project.layout.buildDirectory.file("typescript/intermediaries/optionals.d.ts")


    @TaskAction
    fun remove() {
        val code = input.get().asFile.readLines()
        output.get().asFile.writeText(code.returnOptionals().joinToString("\n"))
    }

    private fun List<String>.returnOptionals(): List<String> = map {
        var out = it
        for (candidate in (it.functionParametersToBeReplaced() + it.propertiesToBeReplaced())) {
            out = out.replace(candidate,candidate.replace(": Nullable","?: Nullable"))
        }
        out
    }

    //show(show: Nullable<boolean>): void;
    private fun String.functionParametersToBeReplaced(): List<String> {
        if (!contains("(")) return emptyList()
        val startIndex = indexOf('(')
        val endIndex = indexOf(')')
        return substring(startIndex, endIndex).split(", ").filter {
            !it.contains("?: Nullable") && it.contains(": Nullable")
        }
    }

    // readonly output: Nullable<O>;
    private fun String.propertiesToBeReplaced(): List<String> {
        if(contains("(")) return emptyList()
        if (!contains(": Nullable")) return emptyList()
        if (contains("?: Nullable")) return emptyList()
        if(!contains("readonly")) return emptyList()
        return listOf(substringAfter("readonly ").substringBefore(";"))
    }
}