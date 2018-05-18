const getPropTypesAsArray = require("./getPropTypesAsArray");
const getAttributeCombinationsFromArray = require("./getAttributeCombinationsFromArray");
const file = require("fs");
require("dotenv").config({path:"katt.config"})

module.exports = (componentName) => {
    var componentPath = `${__dirname}/../${process.env.PATH_TO_COMPONENTS}${componentName}/`;
    var somePropTypeWasUnparseable = false;

    const examplePath = `${componentPath}${componentName}.exampleCombinations.js`;
    if(file.existsSync(examplePath)) return 2;
    
    const propTypes = getPropTypesAsArray(componentName, componentPath);
    const output = propTypes.reduce((acc,item) => {
        const {attribute, propType} = item;
        const combinations = getAttributeCombinationsFromArray(propType);
        acc[attribute] = combinations;
        if(combinations.length===0) somePropTypeWasUnparseable = true;
        return acc;
    }, {});
    
    file.writeFileSync(examplePath, `exports.default = ${JSON.stringify(output, null, 4)}`, {flag: "w"});

    if(somePropTypeWasUnparseable) return 1;
    return 0;
}