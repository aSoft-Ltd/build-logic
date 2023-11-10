package docker.models

import docker.tasks.CreateTextFileTask
import org.gradle.api.tasks.Delete
import org.gradle.api.tasks.TaskProvider

class TextFile(
    val path: String,
    val content: String,
    val create: TaskProvider<CreateTextFileTask>,
    val remove: TaskProvider<Delete>
)