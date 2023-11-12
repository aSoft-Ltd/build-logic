package docker.models

import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider

open class ScopedDeploymentEnvironment2<T : Isolate>(
    name: String,
    isolate: T,
    val workdir: Provider<Directory>
) : DeploymentEnvironment2<T>(name, isolate)