package git.models

import java.io.ByteArrayOutputStream
import java.io.File
import org.gradle.api.tasks.Exec
import org.gradle.api.tasks.TaskProvider

class GitExecution(
    val task: TaskProvider<out Exec>,
    val root: File,
    val output: ByteArrayOutputStream,
)