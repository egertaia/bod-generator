module.exports = (details) => ({
    name: 'bod.gradle',
    extensions: 'kts',
    path: '',
    content: `

version = "${details.gradleVersion}"

project.extra["PluginName"] = "${details.gradleName}"
project.extra["PluginDescription"] = "${details.gradleDescription}"

dependencies {
    //compileOnly(group = "com.openosrs.externals", name = "${details.utils.toLowerCase()}", version = "1.0.0+") uncomment this is you want to use this in a project that doesn't also hold bodutils
    ${details.breakhandler.toLowerCase() === "bodutils"
        ? `//compileOnly(group = "com.openosrs.externals", name = "bodbreakhandler", version = "+")` 
        : `//compileOnly(group = "com.owain.externals", name = "chinbreakhandler", version = "+")`
    }
    //compileOnly(project(":bodutils"))
    //compileOnly(project(":bodbreakhandler"))
}

tasks {
    jar {
        manifest {
            attributes(mapOf(
                    "Plugin-Version" to project.version,
                    "Plugin-Id" to nameToId(project.extra["PluginName"] as String),
                    "Plugin-Provider" to project.extra["PluginProvider"],
                    "Plugin-Dependencies" to
                            arrayOf(
                                nameToId("${details.utils}"),
                                nameToId("${details.breakhandler}")
                            ).joinToString(),
                    "Plugin-Description" to project.extra["PluginDescription"],
                    "Plugin-License" to project.extra["PluginLicense"]
            ))
        }
    }
}`
});