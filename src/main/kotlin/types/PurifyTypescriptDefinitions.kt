package types

import org.gradle.api.Project
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.TaskProvider
import org.gradle.kotlin.dsl.register
import types.tasks.BeginPurificationTask
import types.tasks.RemoveCodeBlockTask
import types.tasks.RemoveLinesTasks
import types.tasks.SplitTypescriptDefinitionsTask

fun Project.purifyTypescriptDefinitions(configure: BeginPurificationTask.() -> Unit): TaskProvider<BeginPurificationTask> {
    val begin = tasks.register<BeginPurificationTask>("beginTypescriptDefinitionPurification") {
        configure()
    }
    val removeBlocks = tasks.register<RemoveCodeBlockTask>("removeCodeBlocksFromTypescriptDefinition") {
        dependsOn(begin)
        input.set(begin.flatMap { it.output })
    }

    val removeLines = tasks.register<RemoveLinesTasks>("removeLinesFromTypescriptDefinitions") {
        dependsOn(removeBlocks)
        input.set(removeBlocks.flatMap { it.output })
    }

    tasks.register<SplitTypescriptDefinitionsTask>("splitTypescriptDefinition") {
        dependsOn(removeLines)
        input.set(removeLines.flatMap { it.output })
    }
    return begin
}