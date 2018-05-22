const generateCombinationsFor = require("../src/generateCombinationsForFunction");
const getComponentFromStdin = require("../src/getComponentFromStdin");

const componentName = getComponentFromStdin();
const result = generateCombinationsFor(componentName);
if(result === 1) console.log(`\tSome attribute combinations for ${componentName} could not be filled automatically. Please manually fill the rest of the file.`);
if(result === 2) console.log(`\tFile for ${componentName} already exists and would be overwritten`);
