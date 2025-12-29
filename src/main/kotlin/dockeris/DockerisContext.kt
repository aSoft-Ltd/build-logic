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

    val port by lazy {
        // We are multiplying by 2 so as we expose 2 ports (one for the server app and one for the database)
        // It's okay to potentially increase this number when we feel like we will be exposing more ports (i.e. the SPA browser)
        OpenPort(app = "${owner.uid}${project.uid}${2 * environment.ordinal}".toInt())
    }
}