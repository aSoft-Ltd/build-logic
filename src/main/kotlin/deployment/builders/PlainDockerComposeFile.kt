package deployment.builders

class PlainDockerComposeFile(
    val version: Double,
    val services: List<PlainDockerService>
)