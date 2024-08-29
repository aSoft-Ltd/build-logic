import org.gradle.kotlin.dsl.maven
import java.io.File

pluginManagement {
    enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")
    repositories {
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
        mavenCentral()
        google()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    versionCatalogs {
        File(rootDir.parentFile, "versions/gradle/versions").listFiles().map {
            it.nameWithoutExtension to it.absolutePath
        }.forEach { (name, path) ->
            create(name) { from(files(path)) }
        }
    }
}

includeBuild("../able")