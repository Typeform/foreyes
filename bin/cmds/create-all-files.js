exports.command = 'create-all-files'
exports.desc = 'Create a base example file for all found components'
exports.handler = () => {
  const path = require('path')
  const generateAllCombinations = require(path.join(
    __dirname,
    '../../src/examples/generateAllCombinations'
  ))

  generateAllCombinations()
}
