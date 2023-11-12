package docker.models

import utils.hyphenize

abstract class AbstractDeploymentEnvironment<T : Isolate>(
    val name: String,
    val isolated: Isolated<T>
) {
    internal val workdir = isolated.workdir.map { it.dir(name.hyphenize()) }
    internal val namespace by lazy { "${isolated.isolate.name}.$name" }
}