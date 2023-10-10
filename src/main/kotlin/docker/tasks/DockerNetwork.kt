package docker.tasks

import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider

class DockerNetwork(
    val name: String,
    val task: TaskProvider<Exec>
)