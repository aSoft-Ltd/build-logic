package dockate.models

import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider

open class ScopedDeploymentEnvironment<T : Isolate>(
    name: String,
    isolate: T,
    val workdir: Provider<Directory>
) : DeploymentEnvironment<T>(name, isolate)