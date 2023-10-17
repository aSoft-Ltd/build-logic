package docker.builders

import org.gradle.api.Project
import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.Copy

class DockerfileBuilder {
    internal val text = StringBuilder()

    internal class Source(val location: Provider<Directory>,val configuration: Copy.() -> Unit)

    internal val sources = mutableListOf<Source>()
    fun Project.source(
        from: Provider<Directory>,
        configuration: Copy.() -> Unit = {}
    ) = sources.add(Source(from, configuration))

    fun Project.source(
        from: Directory,
        configuration: Copy.() -> Unit = {}
    ) = sources.add(Source(provider { from }, configuration))

    fun from(image: String) = text.appendLine("FROM $image")
    fun expose(port: Int) = text.appendLine("EXPOSE $port")

    fun copy(from: Provider<Directory>, into: String) = text.appendLine("COPY ${from.get().asFile.absolutePath} $into")
    fun copy(from: String, into: String) = text.appendLine("COPY $from $into")
    fun cmd(vararg args: String) = text.appendLine("CMD " + args.joinToString(" ") { """"$it"""" })

    fun volume(vararg paths: String) = text.appendLine("VOLUME ${paths.joinToString(" ")}")
    fun run(vararg args: String) = text.appendLine("RUN " + args.joinToString(" ") { """"$it"""" })
}