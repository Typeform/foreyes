const file = require("fs");
const path = require("path");

module.exports = components => {
    const examples = components.reduce((acc, directory) => {
        const componentName = path.basename(directory);
        if (file.existsSync(`${directory}/${componentName}.exampleCombinations.js`)) {
            acc.push(`\n\t${componentName.replace(/-/g, '_')}: { component: require('../${directory}').default, combinations: require('../${directory}/${componentName}.exampleCombinations.js').default }`);
        } 
        return acc;
    }, []);

    return `const examples = {${examples}\n}; \nexport default examples;`;
}