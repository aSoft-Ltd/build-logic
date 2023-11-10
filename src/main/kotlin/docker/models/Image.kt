package docker.models

import docker.tasks.CreateDockerfileTask
import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider

sealed interface Image {
    val name: String
}

class LocalImage(
    override val name: String,
    val version: String,
    val environment: RunningEnvironment,
    val create: TaskProvider<CreateDockerfileTask>,
    val copy: TaskProvider<Copy>,
    val build: TaskProvider<Exec>,
    val remove: TaskProvider<Exec>,
    val directory: Provider<Directory>
) : Image {
    val qualifiedNameWithoutVersion = "$name-${environment.name.lowercase()}"
    val qualifiedNameWithVersion = "$qualifiedNameWithoutVersion:$version"
}

class RegistryImage(override val name: String) : Image