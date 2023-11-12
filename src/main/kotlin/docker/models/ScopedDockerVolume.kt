package docker.models

import deployment.builders.PlainDockerVolume
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider

class ScopedDockerVolume(
    name: String,
    val create: TaskProvider<Exec>,
    val remove: TaskProvider<Exec>
) : PlainDockerVolume(name)