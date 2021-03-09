const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const templates = require('./templates');

clear();

console.log(
    chalk.yellow(
        figlet.textSync('BOD GENERATOR', { horizontalLayout: 'full' })
    )
);

const run = async() => {
    const details = await inquirer.askPluginDetails();

    if (!files.directoryExists(details.sourceFolder)) {
        console.error(chalk.redBright('Source folder doesnt exist!'));
        process.exit(1);
    }

    const componentDirectory = details.sourceFolder + details.pluginName.toLowerCase() + '/';

    if (files.directoryExists(componentDirectory)) {
        console.error(chalk.redBright('Component folder already exist!'));
        process.exit(1);
    }
    files.createDirectory(componentDirectory);

    const generatedTemplates = templates.map((template) => template(details));
    if (details.improvedTimeout) require('./templates/choices/timeout/improved').map((template) => generatedTemplates.push(template(details)));
    else require('./templates/choices/timeout/basic').map((template) => generatedTemplates.push(template(details)));

    console.log(chalk.blueBright('Generating folder structure'));
    generatedTemplates.forEach((template) => {
        const folderStructure = template.path.split('.');
        let currentFolder = componentDirectory;
        let currentResourceFolder = componentDirectory;

        folderStructure.forEach((structure) => {
            let newFolder = `${currentFolder}${structure}/`
            let resourceNewFolder = `${currentResourceFolder}${structure}/`
            if (!files.directoryExists(newFolder)) {
                console.log(chalk.blue(`Created folder: ${newFolder}`));
                files.createDirectory(newFolder);
            }

            if (details.resourceFolder && !files.directoryExists(resourceNewFolder)) {
                console.log(chalk.blue(`Created folder: ${resourceNewFolder}`));
                files.createDirectory(newFolresourceNewFolderder);
            }
            currentFolder = newFolder;
            currentResourceFolder = resourceNewFolder;
        });

        let fileName = `${componentDirectory}${template.path.replace(/\./g, '/')}/${template.name.replace(/(Bod)/g, details.pluginName).replace(/(bod)/g, details.pluginName.toLowerCase())}.${template.extensions}`;
        files.createFile(fileName, template.content);

        console.log(chalk.green(`Created file: ${fileName}`));
    });

    if (details.addToSettings) {
        files.addSettings(details.sourceFolder, details.settingsFile, details.pluginName);
    }

    console.log(
        chalk.yellow(
            figlet.textSync('FINISHED', { horizontalLayout: 'full' })
        )
    );

    console.log(chalk.yellowBright('Now go and start writing your plugins mate.'))
    console.log(chalk.yellowBright('Make sure you add "java" folder as Source and "resources" as Resource in IntelliJ.'))
    console.log(chalk.yellowBright('Written by bod'))

}

run();