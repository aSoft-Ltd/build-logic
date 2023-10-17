package types

import org.gradle.api.Plugin
import org.gradle.api.Project

open class PostProcessTypescriptTypesPlugin : Plugin<Project> {
    override fun apply(target: Project) = target.afterEvaluate {
        val purifyTask = tasks.create("purifyTypes", PurifyTypesTask::class.java)
        val compileTask = tasks.findByName("productionLibraryCompileSync") ?: tasks.findByName("jsProductionLibraryCompileSync")
        val buildTask = tasks.findByName("build")
        purifyTask.dependsOn(compileTask)
        buildTask?.dependsOn(purifyTask)
    }

//    override fun apply(target: Project) {
//        val purifyTask = target.tasks.create("purifyTypes", PurifyTypesTask::class.java)
//        val compileTask = target.tasks.findByName("productionLibraryCompileSync") ?: target.tasks.findByName("jsProductionLibraryCompileSync")
//        val buildTask = target.tasks.findByName("build")
//        purifyTask.dependsOn(compileTask)
//        buildTask?.dependsOn(purifyTask)
//    }
}