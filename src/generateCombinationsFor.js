const getPropTypesAsArray = require('./getPropTypesAsArray')
const getAttributeCombinationsFromArray = require('./getAttributeCombinationsFromArray')
const file = require('fs')
const config = require('../katt.config')

module.exports = (componentName) => {
  var componentPath = `${__dirname}/../${config.path_to_components}${componentName}/`
  var somePropTypeWasUnparseable = false
  
  const examplePath = `${__dirname}/../${config.path_to_examples}${componentName}.exampleCombinations.js`
  if (file.existsSync(examplePath)) return new Error(`File for ${componentName} already exists and would be overwritten`)

  const propTypes = getPropTypesAsArray(componentName, componentPath)
  const output = propTypes.reduce((acc, item) => {
    const {attribute, propType} = item
    const combinations = getAttributeCombinationsFromArray(propType)
    acc[attribute] = combinations
    if (combinations.length === 0) somePropTypeWasUnparseable = true
    return acc
  }, {})

  file.writeFileSync(examplePath, `exports.default = ${JSON.stringify(output, null, 4)}`, {flag: 'w'})

  if (somePropTypeWasUnparseable) return new Error(`Some attribute combinations for ${componentName} could not be filled automatically. Please manually fill the rest of the file.`)
  return 0
}
