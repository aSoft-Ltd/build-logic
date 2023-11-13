package deployment.builders

import docker.builders.PlainDockerComposeFileBuilder

fun dockerComposeFile(
    workdir: String,
    npm: Boolean,
    maven: Boolean
) = PlainDockerComposeFileBuilder().apply {
    version(3.8)
    service("visualize") {
        image("dockersamples/visualizer:latest")
        restart("always")
        port(1010, 8080)
        volume("/var/run/docker.sock")
    }

    service("portainer") {
        image("portainer/portainer:1.25.0-alpine")
        restart("always")
        port(1020, 9000)
        volume("/var/run/docker.sock")
    }

    service("docker-registry") {
        restart("always")
        image("registry:2.8.3")
        port(1030, 5000)
        volume("$workdir/devops/docker-registry/data", "/var/lib/registry")
        volume("$workdir/devops/docker-registry/certs", "/certs")
        volume("$workdir/devops/docker-registry/auth", "/auth")
    }

    if (npm) service("npm-registry") {
        restart("always")
        image("verdaccio/verdaccio:6.x-next")
        port(1040, 4873)
        listOf("conf", "plugins", "storage").forEach {
            volume("$workdir/devops/npm-registry/$it", "/verdaccio/$it")
        }
    }

    if (maven) service("maven-repository") {
        restart("always")
        image("xetusoss/archiva:v2.2.5")
        port(1050, 8080)
        volume("$workdir/devops/maven-repository", "/archiva-data")
    }
}.build()