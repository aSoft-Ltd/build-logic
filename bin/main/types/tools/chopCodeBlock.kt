package types.tools


internal fun List<String>.chopCodeBlock(): List<String> {
    val chopped = mutableListOf<String>()
    var openCounts = 0
    for (lx in this) {
        if (lx.contains("{")) {
            openCounts++
        }
        if (lx.contains("}")) {
            openCounts--
        }
        chopped.add(lx)
        if (openCounts == 0) break
    }
    return chopped
}