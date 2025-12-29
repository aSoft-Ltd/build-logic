package dockeris.volumes

sealed interface VolumeDriver

data class NfsDriver(
    val address: String,
    val device: String,
    val permissions: String = "rw",
    val version: Number = 4
) : VolumeDriver