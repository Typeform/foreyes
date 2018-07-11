const path = require('path')
const file = require('fs')
const config = require(path.resolve(process.cwd(), 'katt.config'))

module.exports = components => {
  const examplePath = config.path_to_examples
  const examples = components.reduce((acc, componentName) => {
    if (file.existsSync(`${examplePath}/${componentName}.customExample.js`)) {
      acc.push(`
    ${componentName.replace(/-/g, '_')}: require('../${examplePath}${componentName}.customExample.js').default`)
    }
    return acc
  }, [])

  return `const examples = {${examples}\n};\nexport default examples;`
}
