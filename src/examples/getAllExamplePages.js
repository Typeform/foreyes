const path = require('path')
const { existsSync } = require('fs')
const { configFilePath } = require(path.join(
  __dirname,
  '..',
  '..',
  'constants.js'
))
const config = require(configFilePath)

module.exports = components => {
  const examplePath = config.path_to_examples
  const sourcePath = config.path_to_components
  const examples = components.reduce((acc, componentName) => {
    const p = path.join(
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
