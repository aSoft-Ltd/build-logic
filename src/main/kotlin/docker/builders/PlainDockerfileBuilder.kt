package docker.builders

import org.gradle.api.file.Directory
import org.gradle.api.provider.ListProperty

open class PlainDockerfileBuilder(
    content: ListProperty<String>,
    directories: ListProperty<Directory>
) : TextFileBuilder("Dockerfile", content, directories) {
    fun from(image: String) {
        +"FROM $image"
    }

    fun build(image: String, named: String = "build"): Step {
        +"FROM $image as build"
        return Step(named)
    }

    fun expose(port: Int) = +"EXPOSE $port"
    fun copy(src: String, dst: String) = +"COPY $src $dst"

    fun copy(from: Step, src: String, dst: String) = +"COPY --from=${from.name} $src $dst"

    fun workdir(path: String) = +"WORKDIR $path"

    fun env(vararg pairs: Pair<String, Any>) {
        +"ENV ${pairs.joinToString(" ") { (key, value) -> "$key=\"$value\"" }}"
    }

    fun cmd(vararg args: String) = +("CMD " + args.joinToString(" ") { """"$it"""" })

    fun volume(vararg paths: String) = +"VOLUME ${paths.joinToString(" ")}"
    fun run(vararg args: String) = +("RUN " + args.joinToString(" && ") { it })
    class Step(val name: String)
}