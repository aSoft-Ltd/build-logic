package docker.builders

import docker.models.AbstractDeploymentEnvironment
import docker.models.DeploymentEnvironment
import docker.models.DeploymentEnvironment2
import docker.models.ScopedDeploymentEnvironment2
import docker.models.TextFile
import docker.tasks.CreateTextFileTask
import org.gradle.api.Project
import org.gradle.api.file.Directory
import org.gradle.api.provider.ListProperty
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.Delete
import org.gradle.api.tasks.TaskCollection
import org.gradle.api.tasks.TaskProvider
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register
import utils.taskify

open class TextFileBuilder(
    private val path: String,
    protected val content: ListProperty<String>,
    protected val directories: ListProperty<Directory>
) {
    protected val dependencies = mutableListOf<TaskProvider<*>>()
    protected val files = mutableListOf<TextFileBuilder>()

    fun dependsOn(task: TaskProvider<*>) {
        dependencies.add(task)
    }

    operator fun String.unaryPlus() {
        content.add(this)
    }

    operator fun String.unaryMinus() {
        content.add(this)
    }

    operator fun Provider<String>.unaryPlus() {
        content.add(this)
    }

    fun Project.build(env: AbstractDeploymentEnvironment<*>, dependsOn: TaskProvider<*>? = null): TextFile {
        val filePath = this@TextFileBuilder.path
        val dst = env.workdir.map { it.file(filePath) }
        val taskName = "${env.namespace}${filePath.capitalized()}".taskify()

        val e = env as? DeploymentEnvironment
        val copy = tasks.register<Copy>("copyTextFile${taskName}Dependencies") {
            if (dependsOn != null) dependsOn(dependsOn)
            if (e?.create != null) dependsOn(e.create)
            from(directories)
            into(env.workdir)
        }

        return TextFile(
            path = filePath,
            create = tasks.register<CreateTextFileTask>("createTextFile$taskName") {
                dependsOn(this@TextFileBuilder.dependencies)
                dependsOn(copy)
                if (dependsOn != null) dependsOn(dependsOn)
                if (e?.create != null) dependsOn(e.create)
                output.set(dst)
                content.set(this@TextFileBuilder.content.map { it.joinToString("\n") })
            },
            remove = tasks.register<Delete>("removeTextFile$taskName") {
                file(dst)
            }
        )
    }

    fun Project.build(env: ScopedDeploymentEnvironment2<*>, dependsOn: TaskProvider<*>? = null): TextFile {
        val filePath = this@TextFileBuilder.path
        val workdir = env.workdir
        val dst = workdir.map { it.file(filePath) }
        val taskName = "${env.namespace}${filePath.capitalized()}".taskify()

        val other = files.map {
            with(it) { build(env, dependsOn) }
        }
        val copy = tasks.register<Copy>("copyTextFile${taskName}Dependencies") {
            group = "Dockate Copy Text File"
            if (dependsOn != null) dependsOn(dependsOn)
            from(directories)
            into(workdir)
        }

        return TextFile(
            path = filePath,
            create = tasks.register<CreateTextFileTask>("createTextFile$taskName") {
                group = "Dockate Create Text File"
                dependsOn(this@TextFileBuilder.dependencies)
                dependsOn(copy)
                dependsOn(other.map { it.create })
                if (dependsOn != null) dependsOn(dependsOn)
                output.set(dst)
                content.set(this@TextFileBuilder.content.map { it.joinToString("\n") })
            },
            remove = tasks.register<Delete>("removeTextFile$taskName") {
                group = "Dockate Remove Text File"
                file(dst)
            }
        )
    }
}