package docker

import org.gradle.api.Plugin
import org.gradle.api.Project

open class DockatePlugin : Plugin<Project> {
    override fun apply(target: Project) {
        target.extensions.add("dockate", DockateExtension::class.java)
    }
}