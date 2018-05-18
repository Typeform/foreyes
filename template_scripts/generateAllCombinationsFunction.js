const generateCombinationsFor = require("./generateCombinationsForFunction");
const getComponentList = require("./getComponentList");

module.exports = () => {
    return getComponentList()
        .reduce((result, componentName) => {
            result.push({
                name: componentName,
                result: generateCombinationsFor(componentName)
            })
            return result;
        }, [])
}