package deployment.builders

import docker.models.Mapping

data class PlainDockerService(
    val name: String,
    val image: String,
    val restart: String?,
    val privileged: Boolean?,
    val exposes: List<Int>,
    val ports: List<Mapping<Int, Int>>,
    val environments: List<Mapping<String, Any>>,
    val dependencies: List<String>,
    val volumes: List<Mapping<String, String>>,
)