package dockate.builders

import docker.builders.PlainDockerfileBuilder
import docker.builders.TextFileBuilder
import org.gradle.api.Project
import org.gradle.api.file.Directory
import org.gradle.api.provider.ListProperty
import org.gradle.api.provider.Provider
import org.gradle.kotlin.dsl.listProperty

open class DockerfileBuilder(
    content: ListProperty<String>,
    directories: ListProperty<Directory>
) : PlainDockerfileBuilder(content, directories) {
    fun copy(from: Directory, into: String) {
        from.asFile.listFiles()?.forEach {
            +"COPY ${it.name} $into/${it.name}"
        }
        directories.add(from)
    }

    fun Project.copy(path: String, builder: TextFileBuilder.() -> Unit) {
        copy(src = path, dst = "/app/$path")
        val tf = TextFileBuilder(path, objects.listProperty(), objects.listProperty())
        tf.builder()
        files.add(tf)
    }

    fun from(from: Provider<Directory>, block: DockerfileBuilder.() -> Unit) {
        directories.add(from)
        block()
    }
}