package docker.models

import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider
import utils.hyphenize
import utils.taskify

open class DeploymentEnvironment2<T : Isolate>(
    val name: String,
    val isolate: T
) {
    val namespace by lazy { "${isolate.name}.$name".lowercase() }

    val path by lazy { "${isolate.name}/$name".hyphenize() }

    val imageTag by lazy { "${isolate.name}-${name}".hyphenize() }

    val taskNameTrail by lazy { imageTag.taskify() }

    internal fun toScoped(workdir: Provider<Directory>) = ScopedDeploymentEnvironment2(name, isolate, workdir)
}