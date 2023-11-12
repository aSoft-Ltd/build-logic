package docker.models

import org.gradle.api.Task
import org.gradle.api.tasks.TaskProvider

class ScopedDockerVolumes(
    val volumes: List<ScopedDockerVolume>,
    val create: TaskProvider<Task>,
    val remove: TaskProvider<Task>
)