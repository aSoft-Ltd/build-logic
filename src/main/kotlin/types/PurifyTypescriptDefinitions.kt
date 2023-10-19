package types

import org.gradle.api.Project
import org.gradle.api.tasks.TaskProvider
import org.gradle.kotlin.dsl.register
import types.tasks.BeginPurificationTask
import types.tasks.RemoveCodeBlockTask
import types.tasks.RemoveLinesTask
import types.tasks.ReturnOptionalsTask
import types.tasks.SplitTypescriptDefinitionsTask

fun Project.purifyTypescriptDefinitions(configure: BeginPurificationTask.() -> Unit): TaskProvider<BeginPurificationTask> {
    val begin = tasks.register<BeginPurificationTask>("beginTypescriptDefinitionPurification") {
        configure()
    }
    val removeBlocks = tasks.register<RemoveCodeBlockTask>("removeCodeBlocksFromTypescriptDefinition") {
        dependsOn(begin)
        input.set(begin.flatMap { it.output })
    }

    val removeLines = tasks.register<RemoveLinesTask>("removeLinesFromTypescriptDefinitions") {
        dependsOn(removeBlocks)
        input.set(removeBlocks.flatMap { it.output })
    }

    val optionals = tasks.register<ReturnOptionalsTask>("returnOptionalsInTypescriptDefinition") {
        dependsOn(removeLines)
        input.set(removeLines.flatMap { it.output })
    }
    tasks.register<SplitTypescriptDefinitionsTask>("splitTypescriptDefinition") {
        dependsOn(optionals)
        input.set(optionals.flatMap { it.output })
    }
    return begin
}