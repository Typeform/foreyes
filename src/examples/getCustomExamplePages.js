const path = require('path')
const fs = require('fs')
const { configFilePath } = require(path.join(
  __dirname,
  '..',
  '..',
  'constants.js'
))
const { pathToExamples } = JSON.parse(fs.readFileSync(configFilePath))

module.exports = components => {
  const examples = components.reduce((acc, componentName) => {
    if (fs.existsSync(`${pathToExamples}/${componentName}.customExample.js`)) {
      acc.push(`
    ${componentName.replace(
    /-/g,
    '_'
  )}: require('../../${pathToExamples}${componentName}.customExample.js').default`)
    }
    return acc
  }, [])

  return `const examples = {${examples}\n};\nexport default examples;`
}
