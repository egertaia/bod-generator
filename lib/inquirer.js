const inquirer = require('inquirer');

module.exports = {
    askPluginDetails: () => {
        const questions = [{
                name: 'gradleName',
                type: 'input',
                message: 'Enter your Plugin Name that goes into gradle file',
                validate: function(value) {
                    if (value.length) return true;
                    else return 'Please enter Plugin Name';
                },
                default: 'Bod Test'
            },
            {
                name: 'gradleDescription',
                type: 'input',
                message: 'Enter your Plugin Description that goes into grade file',
                validate: function(value) {
                    if (value.length) return true;
                    else return 'Please enter Plugin Description';
                },
                default: 'Bod Test Description'
            },
            {
                name: 'gradleVersion',
                type: 'input',
                message: 'Enter your Plugin Version',
                validate: function(value) {
                    if (value.length) return true;
                    else return 'Please enter Plugin Version';
                },
                default: '0.0.1'
            },
            {
                name: 'pluginName',
                type: 'input',
                message: 'Enter your Plugin Name that is going to be the prefix to your plugin. (e.g. BodBarbarian => BodBarbarianConfig, BodBarbarianPlugin etc)',
                validate: function(value) {
                    if (value.length && value[0].toUpperCase() === value[0]) return true;
                    else return 'Please enter Plugin Name starting with capital letter.';
                },
                default: 'BodTest'
            },
            {
                name: 'utils',
                type: 'list',
                message: 'Which type of Utils do you use?',
                choices: ['BodUtils', 'iUtils'],
                default: 'BodUtils'
            },
            {
                name: 'breakhandler',
                type: 'list',
                message: 'Which type of break handler do you use?',
                choices: ['BodBreakHandler', 'ChinBreakHandler'],
                default: 'BodBreakHandler'
            },
            {
                name: 'improvedTimeout',
                type: 'confirm',
                message: 'Do you want to use improved Timeout system by @mikeester?',
            },
            {
                name: 'folderStructure',
                type: 'input',
                message: 'What is your folder structure?',
                default: 'net.runelite.client.plugins',
            },
            {
                name: 'sourceFolder',
                type: 'input',
                message: 'What is your plugin folder located?',
                default: 'C:/dev/osrs/bod-plugins/',
                validate: function(value) {
                    if (value.length && value.slice(-1) === '/') return true;
                    else return 'Please enter Source Folder together with / in the end.';
                }
            },
            {
                name: 'resourceFolder',
                type: 'confirm',
                message: 'Do you want us to create resources folder as well?',
            },
            {
                name: 'addToSettings',
                type: 'confirm',
                message: 'Do you want us to add plugin into settings.gradle.kts too? Make sure you\'ve added //BOD GENERATOR to somewhere in that file for this to work',
            },
            {
                name: 'settingsFile',
                type: 'input',
                message: 'What is settings file name?',
                default: 'settings.gradle.kts',
                when: (answers) => answers.addToSettings
            }

        ];
        return inquirer.prompt(questions);
    }
}