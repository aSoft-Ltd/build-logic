package docker

import org.gradle.configurationcache.extensions.capitalized

internal fun String.taskify() = split("-").joinToString("") { it.capitalized() }