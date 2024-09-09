package dockeris.images

import dockeris.tooling.TextFileBuilder
import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider

class DockerisImageTemplateBuilder : TextFileBuilder() {

    val OPEN_JDK_22_JDK_SLIM = "openjdk:22-jdk-slim"
    val NODE_18_19_0_ALPINE_3_18 = "node:18.19.0-alpine3.18"
    val NGINX_STABLE_PERL = "nginx:stable-perl"

    fun FROM(image: String) {
        lines.add { "FROM $image" }
    }

    fun FROM(image: String, named: String) {
        lines.add { "FROM $image AS $named" }
    }

    fun EXPOSE(port: Int) {
        lines.add { "EXPOSE $port" }
    }

    fun COPY(source: String, destination: String) {
        lines.add { "COPY $source $destination" }
    }

    fun VOLUME(path: String) {
        lines.add { "VOLUME $path" }
    }

    fun CMD(vararg commands: String) {
        lines.add { "CMD ${commands.joinToString(" ")}" }
    }

    class DependencyFile(
        val name: String,
        val destination: String,
        val builder: TextFileBuilder
    )

    internal val dependencies = mutableListOf<DependencyFile>()

    fun COPY(destination: String, configuration: TextFileBuilder.() -> Unit) {
        val source = if (destination.startsWith("/")) destination.replaceFirst("/", "") else destination
        val file = destination.replace("/", "_")
        dependencies.add(DependencyFile(file, source, TextFileBuilder().apply(configuration)))
        COPY(source, destination)
    }

    internal val copy = mutableListOf<CopyDirective>()

    class CopyDirective(
        val source: Provider<Directory>,
        val destination: String
    )

    fun COPY(source: Provider<Directory>, destination: String) {
        val path = if (destination.startsWith("/")) destination.replaceFirst("/", "") else destination
        COPY(path, destination)
        copy.add(CopyDirective(source, path))
    }
}