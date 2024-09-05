package dockate.builders

import docker.builders.TextFileBuilder

fun TextFileBuilder.logging(level: String, configuration: TextFileBuilder.() -> Unit) {
    -"""[logging]"""
    -"""level = "$level""""
    blankline()
    configuration()
}

fun TextFileBuilder.console(format: String) {
    -"""[[logging.appender]]"""
    -"""type = "console""""
    -"""format.type = "$format""""
}

fun TextFileBuilder.mail(
    sender: String,
    host: String? = null,
    user: String? = null,
    port: String? = null,
    password: String? = null
) {
    blankline()
    -"""[[mail.sender]]"""
    -"""type = "$sender""""
    if (host != null) -"""host = "$host""""
    if (user != null) -"""user = "$user""""
    if (port != null) -"""port = $port"""
    if (password != null) -"""password = "$password""""
}

fun TextFileBuilder.database(
    url: String,
    name: String
) {
    -"""[database]"""
    -"""url = "$url""""
    -"""name = "$name""""
    blankline()
}

fun TextFileBuilder.recovery(
    name: String,
    address: String,
    subject: String,
    template: String,
) = templatedEmail(
    context = "authentication",
    scope = "recovery.email",
    name = name,
    address = address,
    subject = subject,
    template = template
)

fun TextFileBuilder.verification(
    name: String,
    address: String,
    subject: String,
    template: String,
) = templatedEmail(
    context = "registration",
    scope = "verification.email",
    name = name,
    address = address,
    subject = subject,
    template = template
)

fun TextFileBuilder.emails() = contextOnly("emails")

fun TextFileBuilder.applicationSubmitted(
    name: String,
    address: String,
    subject: String,
    template: String,
) = templatedEmailNoContext(
    scope = "application.submitted.email",
    name = name,
    address = address,
    subject = subject,
    template = template
)

fun TextFileBuilder.applicationInReview(
    name: String,
    address: String,
    subject: String,
    template: String,
) = templatedEmailNoContext(
    scope = "application.inReview.email",
    name = name,
    address = address,
    subject = subject,
    template = template
)

fun TextFileBuilder.applicationRequiresAction(
    name: String,
    address: String,
    subject: String,
    template: String,
) = templatedEmailNoContext(
    scope = "application.requiresAction.email",
    name = name,
    address = address,
    subject = subject,
    template = template
)

fun TextFileBuilder.applicationAccepted(
    name: String,
    address: String,
    subject: String,
    template: String,
) = templatedEmailNoContext(
    scope = "application.accepted.email",
    name = name,
    address = address,
    subject = subject,
    template = template
)

fun TextFileBuilder.applicationRejected(
    name: String,
    address: String,
    subject: String,
    template: String,
) = templatedEmailNoContext(
    scope = "application.rejected.email",
    name = name,
    address = address,
    subject = subject,
    template = template
)

fun TextFileBuilder.queryMessage(
    name: String,
    address: String,
    subject: String,
    template: String,
) = templatedEmailNoContext(
    scope = "query.email",
    name = name,
    address = address,
    subject = subject,
    template = template
)

private fun TextFileBuilder.templatedEmail(
    context: String,
    scope: String,
    name: String,
    address: String,
    subject: String,
    template: String,
) {
    blankline()
    -"""[$context]"""
    -"""$scope.name = "$name""""
    -"""$scope.address = "$address""""
    -"""$scope.subject = "$subject""""
    -"""$scope.template = "$template""""
}

private fun TextFileBuilder.contextOnly(
    context: String,
) {
    blankline()
    -"""[$context]"""
}

private fun TextFileBuilder.templatedEmailNoContext(
    scope: String,
    name: String,
    address: String,
    subject: String,
    template: String,
) {
    blankline()
    -"""$scope.name = "$name""""
    -"""$scope.address = "$address""""
    -"""$scope.subject = "$subject""""
    -"""$scope.template = "$template""""
}