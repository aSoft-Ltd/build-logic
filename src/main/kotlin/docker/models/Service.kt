package docker.models

class Service<out I : Image>(
    val name: String,
    val image: I,
    val restart: String?,
    val volumes: MutableList<Mapping<Volume, String>>,
    val ports: MutableList<Mapping<Int, Int>>,
    val exposes: MutableList<Int>,
    val environments: MutableList<Mapping<String, Any>>,
    val dependencies: List<Service<*>>
)