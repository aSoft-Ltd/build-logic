package docker.builders

import docker.models.AbstractDeploymentEnvironment
import docker.models.DeploymentEnvironment
import docker.models.Isolate
import docker.models.Isolated
import docker.models.TextFile
import org.gradle.api.Project
import org.gradle.api.file.Directory
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.Delete
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.listProperty
import org.gradle.kotlin.dsl.property
import org.gradle.kotlin.dsl.register
import utils.hyphenize
import utils.taskify

class DeploymentEnvironmentBuilder<T : Isolate>(
    name: String,
    isolated: Isolated<T>
) : AbstractDeploymentEnvironment<T>(name, isolated) {
    internal val files = mutableMapOf<String, TextFile>()
    internal val sources = mutableListOf<Directory>()
    fun Project.file(path: String, builder: TextFileBuilder.() -> Unit) {
        TextFileBuilder(path, objects.listProperty(), objects.listProperty()).apply {
            builder()
            files[path] = build(this@DeploymentEnvironmentBuilder)
        }
    }

    fun copy(dir: Directory) {
        sources.add(dir)
    }

    fun Project.build(): DeploymentEnvironment<T> {
        val envName = this@DeploymentEnvironmentBuilder.name
        val taskName = (isolated.isolate.name.hyphenize() + envName.capitalized()).taskify()
        return DeploymentEnvironment(
            name = envName,
            isolate = isolated,
            create = tasks.register<Copy>("create${taskName}Files") {
                group = "Dockate Create"
                sources.forEach { from(it) }
                into(workdir)
                dependsOn(files.values.map { it.create })
            },
            remove = tasks.register<Delete>("remove${taskName}Files") {
                group = "Dockate Create"
                dependsOn(files.values.map { it.remove })
            }
        )
    }
}