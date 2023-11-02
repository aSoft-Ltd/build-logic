package deployment

import org.gradle.api.Project

open class DeploymentExtension {
    fun Project.server(
        name: String,
        ip: String,
        username: String,
        password: String,
        workdir: String = "/$name"
    ) {
        addInstallDockerTasks(name, ip, username, password, workdir)
    }
}