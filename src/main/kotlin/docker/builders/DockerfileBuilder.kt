package docker.builders

class DockerfileBuilder {
    internal val text = StringBuilder()
    fun from(image: String) = text.appendLine("FROM $image")
    fun expose(port: Int) = text.appendLine("EXPOSE $port")
    fun copy(from: String, into: String) = text.appendLine("COPY $from $into")
    fun cmd(vararg args: String) = text.appendLine("CMD " + args.joinToString(" ") { """"$it"""" })

    fun volume(vararg paths: String) = text.appendLine("VOLUME ${paths.joinToString(" ")}")
    fun run(vararg args: String) = text.appendLine("RUN " + args.joinToString(" ") { """"$it"""" })
}