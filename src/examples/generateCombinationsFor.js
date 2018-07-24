const path = require('path')
const getPropTypesAsArray = require(path.resolve(
  __dirname,
  './getPropTypesAsArray'
))
const getAttributeCombinationsFromArray = require(path.resolve(
  __dirname,
  './getAttributeCombinationsFromArray'
))
const file = require('fs')
const config = require(path.resolve(process.cwd(), 'katt.config'))

module.exports = componentName => {
  const componentPath = path.resolve(
    process.cwd(),
    config.path_to_components,
    componentName,
    `${componentName}.js`
  )
  const examplePath = path.resolve(
    process.cwd(),
    config.path_to_examples,
    `${componentName}.exampleCombinations.js`
  )
  let somePropTypeWasUnparseable = false

  if (file.existsSync(examplePath)) {
    console.log(
      `File for ${componentName} already exists and would be overwritten`
    )
    return 1
  }

  const output = getPropTypesAsArray(componentPath).reduce(
    (acc, { attribute, propType }) => {
      const combinations = getAttributeCombinationsFromArray(propType)
      if (combinations.length === 0) somePropTypeWasUnparseable = true
      return { ...acc, [attribute]: combinations }
    },
    {}
  )

  file.writeFileSync(
    examplePath,
    `exports.default = ${JSON.stringify(output, null, 4)}`,
    { flag: 'w' }
  )

  if (somePropTypeWasUnparseable) {
    console.log(
      `Some attribute combinations for ${componentName} could not be filled automatically. Please manually fill the rest of the file.`
    )
  }
  return 0
}
