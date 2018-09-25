const path = require('path').resolve
const { existsSync } = require('fs')
const { configFilePath } = require(path(__dirname, '..', '..', 'constants.js'))
const { path_to_examples } = require(configFilePath)

module.exports = components => {
  const examplePath = path_to_examples
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
