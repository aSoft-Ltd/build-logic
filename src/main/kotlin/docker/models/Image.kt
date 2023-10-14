package docker.models

import docker.tasks.CreateDockerfileTask
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider

sealed interface Image {
    val name: String
}

class LocalImage(
    override val name: String,
    val create: TaskProvider<CreateDockerfileTask>,
    val build: TaskProvider<Exec>,
    val remove: TaskProvider<Exec>
) : Image {
    val tasks by lazy { listOf(create, build, remove) }
}

class RegistryImage(override val name: String) : Image