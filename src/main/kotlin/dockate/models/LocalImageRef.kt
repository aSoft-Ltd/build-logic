package dockate.models

import org.gradle.api.Task
import org.gradle.api.tasks.TaskProvider

class LocalImageRef(
    val name: String,
    val version: String,
    val create: TaskProvider<Task>,
    val build: TaskProvider<Task>,
    val remove: TaskProvider<Task>,
)