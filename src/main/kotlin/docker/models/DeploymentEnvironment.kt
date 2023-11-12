package docker.models

import org.gradle.api.Task
import org.gradle.api.tasks.TaskProvider

class DeploymentEnvironment<T:Isolate>(
    name: String,
    isolate: Isolated<T>,
    val create: TaskProvider<out Task>,
    val remove: TaskProvider<out Task>
) : AbstractDeploymentEnvironment<T>(name,isolate)