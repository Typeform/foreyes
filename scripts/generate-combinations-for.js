const path = require('path')
const generateCombinationsFor = require(path.resolve(__dirname, '../src/examples/generateCombinationsFor'))
const getComponentFromStdin = require(path.resolve(__dirname, '../src/getComponentFromStdin'))

const componentName = getComponentFromStdin()
const result = generateCombinationsFor(componentName)
console.log(result)
