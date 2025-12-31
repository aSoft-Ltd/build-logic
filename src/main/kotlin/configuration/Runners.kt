package configuration

import org.gradle.api.Project
import org.gradle.kotlin.dsl.register

fun Project.runners(info: RunnerInfo) = info.src.asFile.listFiles().map { file ->
    val name = file.nameWithoutExtension.replaceFirstChar { it.uppercase() }
    tasks.register<ClientRunnerTask>("generate${name}JsonConfig") {
        group = "runner"
        description = "Generate $name client runner json"
        pkg.set(info.pkg)
        src.set(file)
        version.set(this@runners.version.toString())
        dst.set(info.dst.map { it.file("index.kt") })
    }
}