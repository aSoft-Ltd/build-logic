package docker.models

import org.gradle.api.Task
import org.gradle.api.tasks.TaskProvider

class LocalImageRef(
    val name: String,
    val version: String,
    val images: List<LocalImage>,
    val create: TaskProvider<Task>,
    val copy: TaskProvider<Task>,
    val build: TaskProvider<Task>,
    val remove: TaskProvider<Task>,
)