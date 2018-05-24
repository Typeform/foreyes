const file = require("fs");
require('dotenv').config({path: 'katt.config'})

module.exports = components => {
    const examplePath = process.env.PATH_TO_EXAMPLES
    const sourcePath = process.env.PATH_TO_COMPONENTS
    const examples = components.reduce((acc, componentName) => {
        if (file.existsSync(`${examplePath}/${componentName}.exampleCombinations.js`)) {
            acc.push(`\n\t${componentName.replace(/-/g, '_')}: { component: require('../${sourcePath}${componentName}').default, combinations: require('../${examplePath}${componentName}.exampleCombinations.js').default }`);
        } 
        return acc;
    }, []);

    return `const examples = {${examples}\n}; \nexport default examples;`;
}