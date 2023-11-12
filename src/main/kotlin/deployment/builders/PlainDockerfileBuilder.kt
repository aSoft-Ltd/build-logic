package deployment.builders

import docker.builders.TextFileBuilder
import org.gradle.api.file.Directory
import org.gradle.api.provider.ListProperty

open class PlainDockerfileBuilder(
    content: ListProperty<String>,
    directories: ListProperty<Directory>
) : TextFileBuilder("Dockerfile", content, directories) {
    fun from(image: String) = +"FROM $image"
    fun expose(port: Int) = +"EXPOSE $port"
    fun copy(from: String, into: String) = +"COPY $from $into"
    fun cmd(vararg args: String) = +("CMD " + args.joinToString(" ") { """"$it"""" })

    fun volume(vararg paths: String) = +"VOLUME ${paths.joinToString(" ")}"
    fun run(vararg args: String) = +("RUN " + args.joinToString(" ") { """"$it"""" })
}