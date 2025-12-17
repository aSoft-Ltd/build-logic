package dockeris.volumes

data class DockerisVolume(
    val name: String,
    val driver: VolumeDriver
) {
    fun toDockerComposeFile(tab: String, depth: Int) = buildString {
        val padding1 = tab.repeat(depth)
        appendLine("${padding1}$name:")
        val padding2 = tab.repeat(depth + 1)
        val padding3 = tab.repeat(depth + 2)
        when (driver) {
            is NfsDriver -> {
                appendLine("${padding2}driver: local")
                appendLine("${padding2}driver_opts:")
                appendLine("${padding3}type: nfs")
                appendLine("${padding3}o: addr=${driver.address},${driver.permissions},nfsvers=${driver.version}")
                appendLine("${padding3}device: :${driver.device}")
            }
        }
    }
}