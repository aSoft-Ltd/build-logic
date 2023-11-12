package docker.models

import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider

sealed interface Image2 {
    val name: String
}

class LocalImage2<T: Isolate>(
    override val name: String,
    val version: String,
    val environment: DeploymentEnvironment2<T>,
    val dockerFile: TextFile,
    val build: TaskProvider<Exec>,
    val remove: TaskProvider<Exec>,
) : Image2 {
    val qualifiedNameWithoutVersion = "$name-${environment.name.lowercase()}"
    val qualifiedNameWithVersion = "$qualifiedNameWithoutVersion:$version"
}

class RegistryImage2(override val name: String) : Image2