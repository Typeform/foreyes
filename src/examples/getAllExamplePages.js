const file = require("fs");
const config = require('../../katt.config')

module.exports = components => {
    const examplePath = config.path_to_examples
    const sourcePath = config.path_to_components
    const examples = components.reduce((acc, componentName) => {
        if (file.existsSync(`${examplePath}/${componentName}.exampleCombinations.js`)) {
            acc.push(`\n\t${componentName.replace(/-/g, '_')}: { component: require('../${sourcePath}${componentName}').default, combinations: require('../${examplePath}${componentName}.exampleCombinations.js').default }`);
        } 
        return acc;
    }, []);

    return `const examples =  {${examples}\n};\nexport default examples;`;
}