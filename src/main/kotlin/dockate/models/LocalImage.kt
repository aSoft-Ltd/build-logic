package dockate.models

import docker.models.TextFile
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider

class LocalImage<T: Isolate>(
    val name: String,
    val version: String,
    val environment: DeploymentEnvironment<T>,
    val dockerFile: TextFile,
    val build: TaskProvider<Exec>,
    val remove: TaskProvider<Exec>,
) {
    val qualifiedNameWithoutVersion = "$name-${environment.name.lowercase()}"
    val qualifiedNameWithVersion = "$qualifiedNameWithoutVersion:$version"
}