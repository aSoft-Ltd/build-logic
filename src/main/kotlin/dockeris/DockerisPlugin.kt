package dockeris

import org.gradle.api.Plugin
import org.gradle.api.Project

class DockerisPlugin : Plugin<Project> {
    override fun apply(target: Project) {
        DockerisExtension.configure(target)
    }
}