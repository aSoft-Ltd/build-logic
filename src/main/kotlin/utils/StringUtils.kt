package utils

import java.util.Locale.getDefault
import utils.capitalized

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

internal fun String.capitalized() = replaceFirstChar { if (it.isLowerCase()) it.titlecase(getDefault()) else it.toString() }