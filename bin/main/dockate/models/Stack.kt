package dockate.models

class Stack<T: Isolate>(
    val name: String,
    val files: List<ScopedDockerComposeFile<T>>
)