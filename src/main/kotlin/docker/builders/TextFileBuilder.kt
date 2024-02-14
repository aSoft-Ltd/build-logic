package docker.builders

import dockate.models.ScopedDeploymentEnvironment
import docker.models.TextFile
import docker.tasks.CreateTextFileTask
import org.gradle.api.Project
import org.gradle.api.file.Directory
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.file.DuplicatesStrategy
import org.gradle.api.provider.ListProperty
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.Delete
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

    fun blankline() {
        content.add("")
    }

    operator fun Provider<String>.unaryPlus() {
        content.add(this)
    }

    fun Project.build(
        workdir: DirectoryProperty,
        image: String,
        dependsOn: TaskProvider<*>? = null
    ): TextFile {
        val filePath = this@TextFileBuilder.path
        val dst = workdir.map { it.file(filePath) }
        val taskName = "${image.capitalized()}${filePath.capitalized()}".taskify()

        val copy = tasks.register<Copy>("copyTextFile${taskName}Dependencies") {
            group = "Dockate Copy Text File"
            if (dependsOn != null) dependsOn(dependsOn)
            from(directories)
            duplicatesStrategy = DuplicatesStrategy.INCLUDE
            into(workdir)
        }

        return TextFile(
            path = filePath,
            create = tasks.register<CreateTextFileTask>("createTextFile$taskName") {
                group = "Dockate Create Text File"
                dependsOn(this@TextFileBuilder.dependencies)
                dependsOn(copy)
                if (dependsOn != null) dependsOn(dependsOn)
                output.set(dst)
                content.set(this@TextFileBuilder.content)
            },
            remove = tasks.register<Delete>("removeTextFile$taskName") {
                group = "Dockate Remove Text File"
                file(dst)
            }
        )
    }

    fun Project.build(env: ScopedDeploymentEnvironment<*>, image: String, dependsOn: TaskProvider<*>? = null): TextFile {
        val filePath = this@TextFileBuilder.path
        val workdir = env.workdir
        val dst = workdir.map { it.file(filePath) }
        val taskName = "${env.namespace}${image.capitalized()}${filePath.capitalized()}".taskify()

        val other = files.map {
            with(it) { build(env, image, dependsOn) }
        }
        val copy = tasks.register<Copy>("copyTextFile${taskName}Dependencies") {
            group = "Dockate Copy Text File"
            if (dependsOn != null) dependsOn(dependsOn)
            from(directories)
            duplicatesStrategy = DuplicatesStrategy.INCLUDE
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
                content.set(this@TextFileBuilder.content)
            },
            remove = tasks.register<Delete>("removeTextFile$taskName") {
                group = "Dockate Remove Text File"
                file(dst)
            }
        )
    }
}