const generateCombinationsFor = require('../src/examples/generateCombinationsFor')
const getComponentFromStdin = require('../src/examples/getComponentFromStdin')

const componentName = getComponentFromStdin()
const result = generateCombinationsFor(componentName)
console.log(result)
