package dockate.builders

import dockate.models.DeploymentEnvironment
import dockate.models.Isolate

private fun <T : Isolate> environments(
    isolates: Iterable<T>,
    vararg names: String
): List<DeploymentEnvironment<T>> = buildList {
    for (isolated in isolates) {
        for (env in names) {
            add(DeploymentEnvironment(env, isolated))
        }
    }
}

fun <T : Isolate> environments(
    isolates: Array<T>,
    vararg names: String
) = environments(isolates.asIterable(), *names)

fun <T : Isolate> environments(
    isolates: List<T>,
    vararg names: String
) = environments(isolates.asIterable(), *names)