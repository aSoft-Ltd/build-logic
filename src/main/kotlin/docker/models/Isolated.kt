package docker.models

import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider

class Isolated<T:Isolate>(
    val isolate: T,
    val workdir: Provider<Directory>
)