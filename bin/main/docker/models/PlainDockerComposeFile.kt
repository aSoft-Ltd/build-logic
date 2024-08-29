package docker.models

open class PlainDockerComposeFile(
    val version: Double,
    val name: String?,
    val services: List<PlainDockerService>,
    val volumes: List<PlainDockerVolume>
)