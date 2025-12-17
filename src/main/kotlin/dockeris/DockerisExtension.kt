package dockeris

import dockeris.images.DockerisImageTemplate
import dockeris.images.DockerisImageTemplateBuilder
import dockeris.images.DockerisUniversalImageBuilder
import dockeris.images.DockerisUniversalImageTemplate
import dockeris.images.ImageTaskFactory
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

    internal val environments = mutableListOf<String>()
    fun environments(vararg names: String) {
        environments.addAll(names)
    }

    internal val owners = mutableListOf<String>()
    fun owners(vararg names: String) {
        owners.addAll(names)
    }

    @Deprecated("in favour of imgs")
    internal val images = mutableListOf<DockerisImageTemplate>()

    // TODO: Rename to images
    internal val imgs = mutableListOf<DockerisUniversalImageTemplate>()

    private val contexts = mutableMapOf<String, DockerisContext>()
    internal fun context(owner: String, environment: String): DockerisContext = contexts.getOrPut(key = "$owner-$environment") {
        DockerisContext(environment, owner)
    }

    internal fun each(block: (DockerisContext) -> Unit) {
        for (owner in owners) for (environment in environments) {
            block(context(owner, environment))
        }
    }

    internal fun <R> map(transform: (DockerisContext) -> R): List<R> {
        val result = mutableListOf<R>()
        each { result.add(transform(it)) }
        return result
    }

    fun image(
        name: String = project.name,
//        version: String = project.version.toString(),
        platform: List<String> = mutableListOf("linux/amd64", "linux/arm64"),
        dependsOn: TaskProvider<Task>? = null,
        builder: DockerisImageTemplateBuilder.(context: DockerisContext) -> Unit
    ) = with(ImageTaskFactory) {
        createImageTemplateWithItsTasks(project, name, project.version.toString(), platform, dependsOn, builder)
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
        createRegistryStackTemplateWithItsTasks(project, name, url, user, pass, workdir)
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