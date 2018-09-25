const path = require('path').resolve
const getPropTypesAsArray = require(path(__dirname, './getPropTypesAsArray'))
const getAttributeCombinationsFromArray = require(path(
  __dirname,
  './getAttributeCombinationsFromArray'
))
const file = require('fs')
const { configFilePath } = require(path(__dirname, '..', '..', 'constants.js'))
const { path_to_components, path_to_examples } = require(configFilePath)

module.exports = componentName => {
  const componentPath = path(
    process.cwd(),
    path_to_components,
    componentName,
    `${componentName}.js`
  )
  const examplePath = path(
    process.cwd(),
    path_to_examples,
    `${componentName}.exampleCombinations.js`
  )
  let somePropTypeWasUnparseable = false

  if (file.existsSync(examplePath)) {
    const existsMsg = `File for ${componentName} already exists and would be overwritten`
    console.log(existsMsg)
    return existsMsg
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
}
