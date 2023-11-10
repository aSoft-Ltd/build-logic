package deployment

import deployment.builders.dockerComposeFile
import deployment.builders.toRawText
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import org.gradle.configurationcache.extensions.capitalized
import org.gradle.kotlin.dsl.register

internal fun Project.addInstallDockerTasks(
    name: String,
    ip: String,
    username: String,
    password: String,
    workdir: String,
    npmRegistry: Boolean = true,
    mavenRepository: Boolean = false,
) {
    val createDevopsWorkdir = tasks.register<Exec>("createDevopsWorkingDirIn${name.capitalized()}Server") {
        group = "deployment"
        val script = listOf(
            "echo $password | sudo -S mkdir $workdir/devops -p ",
            "sudo chown $username: $workdir",
            "sudo chmod u+w $workdir",
            "sudo chown $username: $workdir/devops",
            "sudo chmod u+w $workdir",
        ).joinToString(" && ")
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    val download = tasks.register<Exec>("downloadDockerScriptTo${name.capitalized()}Server") {
        group = "deployment"
        val script = "curl -fsSL https://get.docker.com -o get-docker.sh"
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    val postInstall = tasks.register<Exec>("postInstallDockerIn${name.capitalized()}Server") {
        group = "deployment"
        val script = listOf(
            "sudo -S groupadd docker",
            "sudo usermod -aG docker $username",
            "newgrp docker"
        ).joinToString(" && ", prefix = "echo $password | ")
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    val install = tasks.register<Exec>("installDockerIn${name.capitalized()}Server") {
        group = "deployment"
        dependsOn(download)
        finalizedBy(postInstall)
        val script = "echo $password | sudo -S sh get-docker.sh"
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    val createDockerRegistryWorkDir = tasks.register<Exec>("createDockerRegistryWorkingDirIn${name.capitalized()}Server") {
        group = "deployment"
        dependsOn(createDevopsWorkdir)
        mustRunAfter(postInstall)
        val script = listOf("auth", "certs", "data").joinToString(
            separator = " ",
            prefix = "echo $password | sudo -S mkdir ",
            postfix = " -p"
        ) {
            "$workdir/devops/docker-registry/$it"
        }
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    val createNpmRegistryWorkDir = if (npmRegistry) {
        val create = tasks.register<Exec>("createNpmRegistryWorkingDirIn${name.capitalized()}Server") {
            group = "deployment"
            dependsOn(createDevopsWorkdir)
            mustRunAfter(postInstall)
            val script = listOf("conf", "plugins", "storage").joinToString(
                separator = " ",
                prefix = "echo $password | sudo -S mkdir ",
                postfix = " -p"
            ) {
                "$workdir/devops/npm-registry/$it"
            }
            commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
        }

        tasks.register<Exec>("writeVedaccioConfigTo${name.capitalized()}Server") {
            group = "deployment"
            dependsOn(create)
            val dir = "$workdir/devops/npm-registry"
            val text = defaultVedaccioConfig()
            val script = listOf(
                "sudo -S mkdir $dir -p",
                "sudo chown -R $username:$username $dir",
                "sudo echo '$text' > $dir/conf/config.yaml",
                "sudo chown -R 10001:65533 $dir",
            ).joinToString(" && ", prefix = "echo $password | ")
            commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
        }
    } else null

    tasks.register("setupDockerIn${name.capitalized()}Server") {
        group = "deployment"
        dependsOn(install, postInstall, createDockerRegistryWorkDir)
    }

    val generateDockerComposeFile = tasks.register<Exec>("generateDockerComposeFileIn${name.capitalized()}Server") {
        group = "deployment"
        dependsOn(createDockerRegistryWorkDir)
        if (createNpmRegistryWorkDir != null) dependsOn(createNpmRegistryWorkDir)
        val text = dockerComposeFile(workdir, npmRegistry, mavenRepository).toRawText("  ")
        val script = listOf(
            "echo $password | sudo -S chown $username: $workdir",
            "sudo chmod u+w $workdir",
            "echo '$text' > $workdir/devops/docker-compose.yml"
        ).joinToString(" && ")
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    tasks.register<Exec>("initDockerSwarmManagerIn${name.capitalized()}Server") {
        group = "deployment"
        val script = "echo $password | sudo -S docker swarm init"
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    tasks.register<Exec>("startDevopsServicesIn${name.capitalized()}Server") {
        group = "deployment"
        dependsOn(generateDockerComposeFile)
        val script = "cd $workdir/devops && echo $password | sudo -S docker compose pull && sudo docker stack deploy -c docker-compose.yml devops"
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    tasks.register<Exec>("stopDevopsServicesIn${name.capitalized()}Server") {
        group = "deployment"
        val script = "cd $workdir/devops && echo $password | sudo -S docker stack remove devops"
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    val uninstall = tasks.register<Exec>("uninstallDockerIn${name.capitalized()}Server") {
        group = "deployment"
        val script = "echo $password | sudo -S apt-get purge -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras"
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    tasks.register<Exec>("purgeDockerIn${name.capitalized()}Server") {
        group = "deployment"
        dependsOn(uninstall)
        val script = listOf(
            "sudo -S rm -rf /var/lib/docker",
            "sudo rm -rf /var/lib/containerd",
            "sudo groupdel docker"
        ).joinToString(" && ", prefix = "echo $password | ")
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }

    tasks.register<Exec>("removeDevopsWorkingDirIn${name.capitalized()}Server") {
        group = "deployment"
        val script = "echo $password | sudo -S rm $workdir -rf"
        commandLine("sshpass", "-p", password, "ssh", "-t", "$username@$ip", "$script && exit; /bin/bash")
    }
}