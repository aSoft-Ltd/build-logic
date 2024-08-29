package deployment

import org.gradle.api.Plugin
import org.gradle.api.Project

class DeploymentPlugin : Plugin<Project> {
    override fun apply(target: Project) {
        val ext = target.extensions.create("deployment", DeploymentExtension::class.java)
    }
}