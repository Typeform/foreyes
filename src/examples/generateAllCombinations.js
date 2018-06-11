const path = require('path')
const generateCombinationsFor = require(path.resolve(__dirname, './generateCombinationsFor'))
const getComponentList = require(path.resolve(__dirname, './getComponentList'))

module.exports = () => {
  return getComponentList()
    .reduce((result, componentName) => {
      result.push({
        name: componentName,
        result: generateCombinationsFor(componentName)
      })
      return result
    }, [])
}
