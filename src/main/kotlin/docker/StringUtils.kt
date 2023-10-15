package docker

import org.gradle.configurationcache.extensions.capitalized

internal fun String.taskify() = split("-").joinToString("") { it.capitalized() }
    .split(".").joinToString("") { it.capitalized() }
    .split("/").joinToString("") { it.capitalized() }