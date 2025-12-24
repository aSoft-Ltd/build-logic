package dockeris

import catalog.DeployableProject
import catalog.Owner
import catalog.RunningEnvironment

data class DockerisContext(
    val owner: Owner,
    val project: DeployableProject,
    val environment: RunningEnvironment
) {
    class OpenPort(
        val app: Int
    ) {
        val db = app + 1
    }

    val port by lazy { OpenPort(app = "${owner.uid}${project.uid}${environment.ordinal}".toInt()) }
}