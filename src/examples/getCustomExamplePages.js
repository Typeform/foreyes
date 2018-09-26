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
  const examples = components.reduce((acc, componentName) => {
    if (existsSync(`${examplePath}/${componentName}.customExample.js`)) {
      acc.push(`
    ${componentName.replace(
    /-/g,
    '_'
  )}: require('../../${examplePath}${componentName}.customExample.js').default`)
    }
    return acc
  }, [])

  return `const examples = {${examples}\n};\nexport default examples;`
}
