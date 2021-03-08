const fs = require('fs');
const _ = require('lodash');

module.exports = {
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },

    createDirectory: (filePath) => {
        return fs.mkdirSync(filePath);
    },

    createFile: (url, content) => {
        return fs.writeFileSync(url, content.replace(/\r\n/gm, "\n").replace(/\n/gm, "\r\n"))
    },

    addSettings: (url, settingsName, name) => {
        let fileData = fs.readFileSync(`${url}${settingsName}`).toString().split('\n');
        let rowIndex = fileData.findIndex(el => _.includes(el, '//BOD GENERATOR'));
        if (rowIndex > -1) {
            fileData.splice(rowIndex + 1, 0, `include(":${name.toLowerCase()}")`);
            var text = fileData.join('\n');

            fs.writeFileSync(`${url}${settingsName}`, text);
        }
    }
};