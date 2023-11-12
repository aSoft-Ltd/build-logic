package docker.models

private fun <T : Isolate> environments(
    isolates: Iterable<T>,
    vararg names: String
): List<DeploymentEnvironment2<T>> = buildList {
    for (isolated in isolates) {
        for (env in names) {
            add(DeploymentEnvironment2(env, isolated))
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