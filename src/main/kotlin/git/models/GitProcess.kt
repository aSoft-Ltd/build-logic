package git.models

import java.io.File

class GitProcess(
    val workdir: File,
    val process: Process,
    val out: File,
    val err: File,
) {

}