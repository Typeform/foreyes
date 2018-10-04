const path = require('path')
const getPropTypesAsArray = require(path.join(
  __dirname,
  './getPropTypesAsArray'
))
const getAttributeCombinationsFromArray = require(path.join(
  __dirname,
  './getAttributeCombinationsFromArray'
))
const fs = require('fs')
const { configFilePath } = require(path.join('..', '..', 'constants.js'))
const { pathToComponents, pathToExamples } = JSON.parse(
  fs.readFileSync(configFilePath)
)

module.exports = componentName => {
  const examplePath = path.join(
    process.cwd(),
    pathToExamples,
    `${componentName}.exampleCombinations.js`
  )
  let somePropTypeWasUnparseable = false

  if (fs.existsSync(examplePath)) {
    const existsMsg = `File for ${componentName} already exists and would be overwritten`
    console.log(existsMsg)
    return existsMsg
  }

  const componentPath = path.join(
    process.cwd(),
    pathToComponents,
    componentName,
    `${componentName}.js`
  )

  const output = getPropTypesAsArray(componentPath).reduce(
    (acc, { attribute, propType }) => {
      const combinations = getAttributeCombinationsFromArray(propType)
      if (combinations.length === 0) somePropTypeWasUnparseable = true
      return { ...acc, [attribute]: combinations }
    },
    {}
  )

  fs.writeFileSync(
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
