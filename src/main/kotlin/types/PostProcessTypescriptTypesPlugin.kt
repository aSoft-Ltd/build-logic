package types

import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.register
import types.tasks.BeginPurificationTask
import types.tasks.RemoveCodeBlockTask
import types.tasks.RemoveLinesTasks
import types.tasks.SplitTypescriptDefinitionsTask

open class PostProcessTypescriptTypesPlugin : Plugin<Project> {
    override fun apply(target: Project) {
//        val begin = target.tasks.register<BeginPurificationTask>("beginTypescriptDefinitionPurification")
//        val removeBlocks = target.tasks.register<RemoveCodeBlockTask>("removeCodeBlocksFromTypescriptDefinition") {
//            dependsOn(begin)
//            input.set(begin.flatMap { it.output })
//        }
//
//        val removeLines = target.tasks.register<RemoveLinesTasks>("removeLinesFromTypescriptDefinitions") {
//            dependsOn(removeBlocks)
//            input.set(removeBlocks.flatMap { it.output })
//        }
//
//        val split = target.tasks.register<SplitTypescriptDefinitionsTask>("splitTypescriptDefinition") {
//            dependsOn(removeLines)
//            input.set(removeLines.flatMap { it.output })
//        }
    }
}