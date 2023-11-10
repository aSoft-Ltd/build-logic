package docker.models

import docker.builders.DockerComposeFileBuilder

class RunningEnvironment(
    val name: String,
    val dcf: DockerComposeFileBuilder,
    val files: List<TextFile>
)