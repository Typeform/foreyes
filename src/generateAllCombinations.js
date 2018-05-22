const generateCombinationsFor = require("./generateCombinationsFor");
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