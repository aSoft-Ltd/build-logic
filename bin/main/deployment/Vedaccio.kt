package deployment

internal fun defaultVedaccioConfig() = """
storage: ../storage
auth:
  htpasswd:
    file: ./htpasswd
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
packages:
  "@picortex/*":
    access: ${'$'}anonymous
    publish: ${'$'}anonymous
  "@*/*":
    access: ${'$'}anonymous
    publish: ${'$'}anonymous
    proxy: npmjs
  "**":
    proxy: npmjs
web:
  enable: true
  title: NPM Registry
  logo: logo.png
  scope:
logs:
  - { type: stdout, format: pretty, level: http }
""".trimIndent()