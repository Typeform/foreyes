const generateCombinationsFor = require("../src/generateCombinationsForFunction");
const getComponentFromStdin = require("../src/getComponentFromStdin");

const componentName = getComponentFromStdin();
const result = generateCombinationsFor(componentName);
console.log(result);