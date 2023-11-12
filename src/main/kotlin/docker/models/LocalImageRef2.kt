package docker.models

import org.gradle.api.Task
import org.gradle.api.tasks.TaskProvider

class LocalImageRef2<T: Isolate>(
    val name: String,
    val version: String,
    val images: List<LocalImage2<T>>,
    val create: TaskProvider<Task>,
    val build: TaskProvider<Task>,
    val remove: TaskProvider<Task>,
)