package configuration

import org.gradle.api.file.Directory
import org.gradle.api.provider.Provider

class RunnerInfo(
    val src: Directory,
    val dst: Provider<Directory>,
    val pkg: String = "tz.co.asoft.runner.config",
)