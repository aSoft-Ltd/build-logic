package dockeris

import catalog.DeployableProject
import catalog.Owner
import catalog.RunningEnvironment
import dockeris.images.DockerisUniversalImageBuilder
import dockeris.images.DockerisUniversalImageTemplate
import dockeris.images.ImageTaskFactory
import dockeris.registries.DockerisRegistry
import dockeris.stacks.DockerisStackBuilder
import dockeris.stacks.DockerisStackTemplate
import dockeris.stacks.LocalStackTaskFactory
import dockeris.stacks.RegistryStackTaskFactory
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.tasks.TaskProvider

abstract class DockerisExtension(private val project: Project) {
    companion object {
        internal val NAME = "dockeris"
        internal fun configure(project: Project) {
            val dockeris = project.extensions.create(NAME, DockerisExtension::class.java, project)
            dockeris.directory.set(project.layout.buildDirectory.dir(NAME))
        }
    }

    abstract val directory: DirectoryProperty

    internal val environments = mutableListOf<RunningEnvironment>()
    fun environments(vararg them: RunningEnvironment) {
        environments.addAll(them)
    }

    internal val owners = mutableListOf<Owner>()
    fun owners(vararg them: Owner) {
        owners.addAll(them)
    }

    internal val images = mutableListOf<DockerisUniversalImageTemplate>()
    internal val registries = mutableListOf<DockerisRegistry>()
    private val contexts = mutableMapOf<String, DockerisContext>()

    private var deploying: DeployableProject? = null
    fun deploying(project: DeployableProject) {
        deploying = project
    }

    internal fun context(owner: Owner, project: DeployableProject, environment: RunningEnvironment): DockerisContext = contexts.getOrPut(key = "${owner.name}-${environment.name}") {
        DockerisContext(owner, project, environment)
    }

    internal fun each(block: (DockerisContext) -> Unit) {
        val p = deploying ?: throw IllegalStateException(
            """
                |DeployableProject is not initialized yet.
                |Do setup the deployable project before using dockeris
                |dockeris {
                |    deploying(Projects.academia)
                |}
                |""".trimMargin()
        )
        for (owner in owners) for (environment in environments) {
            block(context(owner, p, environment))
        }
    }

    internal fun <R> map(transform: (DockerisContext) -> R): List<R> {
        val result = mutableListOf<R>()
        each { result.add(transform(it)) }
        return result
    }

    fun image(
        name: String = project.name,
        version: String = project.version.toString(),
        platform: List<String> = mutableListOf("linux/amd64", "linux/arm64"),
        dependsOn: TaskProvider<Task>? = null,
        builder: DockerisUniversalImageBuilder.() -> Unit
    ) = with(ImageTaskFactory) {
        createUniversalImageTemplateWithItsTasks(project, name, version, platform, dependsOn, builder)
    }

    internal val stacks = mutableListOf<DockerisStackTemplate>()
    fun stack(
        builder: DockerisStackBuilder.(context: DockerisContext) -> Unit
    ) = with(LocalStackTaskFactory) {
        createStackTemplateWithItsTasks(project, builder)
    }

    fun registry(
        name: String,
        url: String,
        user: String,
        pass: String,
        workdir: String,
    ) = with(RegistryStackTaskFactory) {
        val registry = DockerisRegistry(name, url, user, pass, workdir)
        registries.add(registry)
        createRegistryStackTemplateWithItsTasks(project, registry)
    }

    fun runner(
        name: String,
        url: String,
        user: String,
        pass: String,
        workdir: String,
    ) = with(RegistryStackTaskFactory) {
        createRunnerStackTemplateWithItsTasks(project, name, url, user, pass, workdir)
    }
}