package dockate

import org.gradle.api.Plugin
import org.gradle.api.Project

open class DockatePlugin : Plugin<Project> {
    override fun apply(target: Project) {
        val dockate = target.extensions.create("dockate", DockateExtension::class.java, target)
        dockate.output.set(target.layout.buildDirectory.dir("dockate"))
    }
}