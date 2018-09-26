const path = require('path')
const generateCombinationsFor = require(path.join(
  __dirname,
  './generateCombinationsFor'
))
const getComponentList = require(path.join(__dirname, './getComponentList'))

module.exports = () => {
  return getComponentList().reduce((result, componentName) => {
    return [
      ...result,
      {
        name: componentName,
        result: generateCombinationsFor(componentName)
      }
    ]
  }, [])
}
