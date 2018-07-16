const path = require('path')
const file = require('fs')
const config = require(path.resolve(process.cwd(), 'katt.config'))
module.exports = components => {
  const examplePath = config.path_to_examples
  const sourcePath = config.path_to_components
  const examples = components.reduce((acc, componentName) => {
    const p = path.resolve(
      process.cwd(),
      examplePath,
      `${componentName}.exampleCombinations.js`
    )
    if (file.existsSync(p)) {
      acc.push(
        `\n\t${componentName.replace(
          /-/g,
          '_'
        )}: { component: require('../../${sourcePath}${componentName}').default, combinations: require('../../${examplePath}${componentName}.exampleCombinations.js').default }`
      )
    }
    return acc
  }, [])

  return `const examples =  {${examples}\n};\nexport default examples;`
}
