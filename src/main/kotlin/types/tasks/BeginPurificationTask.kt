package types.tasks

import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.file.RegularFile
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.InputDirectory
import org.gradle.api.tasks.OutputFile
import org.gradle.api.tasks.TaskAction

abstract class BeginPurificationTask : DefaultTask() {

    @get:InputDirectory
    abstract val directory: DirectoryProperty

    @get:OutputFile
    val output: Provider<RegularFile> = project.layout.buildDirectory.file("typescript/intermediaries/beginning.d.ts")

    @TaskAction
    fun initiate() {
        val definition = directory.get().asFile.listFiles()?.firstOrNull { it.name.contains(".d.ts") }
        definition?.copyTo(output.get().asFile, overwrite = true)
    }
}