exports.command = 'mass-generate-combinations'
exports.desc = 'Create a base example file for all found components'
exports.handler = () => {
  const path = require('path')
  const generateAllCombinations = require(path.resolve(__dirname, '../../src/examples/generateAllCombinations'))

  generateAllCombinations()
}
