const generateAllCombinations = require('../src/generateAllCombinations')

const result = generateAllCombinations()
console.log(`\n${result.notCreated}/${result.nComponents} components with no propTypes (${(100 * result.notCreated / result.nComponents).toFixed(2)}%)`)
