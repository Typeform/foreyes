const path = require('path')
const fs = require('fs')
const { configFilePath } = require(path.join('..', '..', 'constants.js'))
const { pathToComponents, pathToExamples } = JSON.parse(
  fs.readFileSync(configFilePath)
)

module.exports = components => {
  const examples = components.reduce((acc, componentName) => {
    const examplePath = path.join(
      process.cwd(),
      pathToExamples,
      `${componentName}.exampleCombinations.js`
    )
    if (fs.existsSync(examplePath)) {
      acc.push(
        `\n\t${componentName.replace(
          /-/g,
          '_'
        )}: { component: require('../../${pathToComponents}${componentName}').default, combinations: require('../../${pathToExamples}${componentName}.exampleCombinations.js').default }`
      )
    }
    return acc
  }, [])

  return `const examples = {${examples}\n};\nexport default examples;`
}
