package utils

import org.gradle.configurationcache.extensions.capitalized

internal fun String.taskify() = split("-").joinToString("") { it.capitalized() }
    .split(".").joinToString("") { it.capitalized() }
    .split("/").joinToString("") { it.capitalized() }

internal fun String.hyphenize() = flatMap {
    if (it in 'A'..'Z') {
        listOf('-', it.lowercase())
    } else {
        listOf(it.lowercase())
    }
}.joinToString("")