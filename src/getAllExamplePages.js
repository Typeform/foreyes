const file = require("fs");
const config = require('../katt.config')

module.exports = components => {
    const examplePath = config.path_to_examples
    const sourcePath = config.path_to_components
    const examples = components.reduce((acc, componentName) => {
        if (file.existsSync(`${examplePath}/${componentName}.exampleCombinations.js`)) {
            acc.push(componentName);
        } 
        return acc;
    }, []);

    return `const examples = ${JSON.stringify(examples)};\nexport default examples;`;
}