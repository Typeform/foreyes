const generateCombinationsFor = require('../src/generateCombinationsFor')
const getComponentFromStdin = require('../src/getComponentFromStdin')

const componentName = getComponentFromStdin()
const result = generateCombinationsFor(componentName)
console.log(result)
