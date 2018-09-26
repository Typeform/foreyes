exports.command = 'create-file'
exports.desc = 'Create a base example file.'
exports.builder = {
  component: {
    default: undefined,
    required: true
  }
}
exports.handler = ({ component }) => {
  const path = require('path')
  const generateCombinationsFor = require(path.join(
    __dirname,
    '../../src/examples/generateCombinationsFor'
  ))
  console.log(generateCombinationsFor(component))
}
