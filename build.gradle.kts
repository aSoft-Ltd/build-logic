plugins {
    `kotlin-dsl`
}

repositories {
    mavenCentral()
    gradlePluginPortal()
}

group = "tz.co.asoft"
version = "0.0.0"

dependencies {
    testImplementation(kotlin("test"))
}