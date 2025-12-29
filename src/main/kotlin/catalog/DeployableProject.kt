package catalog

data class DeployableProject(
    val uid: Int,
    val name: String
)

object Projects {
    val heimdal by lazy { DeployableProject(10, "heimdal") }
    val overwatch by lazy { DeployableProject(11, "overwatch") }
    val academia by lazy { DeployableProject(12, "academia") }
}