const path = require('path').resolve
const { existsSync } = require('fs')
const { configFilePath } = require(path(__dirname, '..', '..', 'constants.js'))
const { path_to_components, path_to_examples } = require(configFilePath)

module.exports = components => {
  const examplePath = path_to_examples
  const sourcePath = path_to_components
  const examples = components.reduce((acc, componentName) => {
    const p = path(
      process.cwd(),
      examplePath,
      `${componentName}.exampleCombinations.js`
    )
    if (existsSync(p)) {
      acc.push(
        `\n\t${componentName.replace(
          /-/g,
          '_'
        )}: { component: require('../../${sourcePath}${componentName}').default, combinations: require('../../${examplePath}${componentName}.exampleCombinations.js').default }`
      )
    }
    return acc
  }, [])

  return `const examples = {${examples}\n};\nexport default examples;`
}
