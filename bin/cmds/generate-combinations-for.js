exports.command = 'generate-combinations-for'
exports.desc = 'Create a base example file.'
exports.builder = {
  component: {
    default: undefined
  }
}
exports.handler = ({ component }) => {
  const path = require('path')
  const generateCombinationsFor = require(path.resolve(__dirname, '../../src/examples/generateCombinationsFor'))
  console.log(generateCombinationsFor(component))
}
