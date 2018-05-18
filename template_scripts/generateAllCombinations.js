const generateAllCombinationsFunction = require("./generateAllCombinationsFunction");

const result = generateAllCombinationsFunction();
console.log(`\n${result.notCreated}/${result.nComponents} components with no propTypes (${(100 * result.notCreated / result.nComponents).toFixed(2)}%)`)
