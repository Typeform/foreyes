const path = require('path')
const config = require(path.resolve(process.cwd(), 'katt.config'))

componentsToStorybookUrls = (components) => {
  return components.map(({componentName, type}) => {
    return `http://localhost:${config.serverPort}/iframe.html?full=1&selectedStory=${type}&selectedKind=${componentName.replace(/-/g, "_")}`
  })
}

const components = JSON.parse(process.env.COMPONENTS)
module.exports = JSON.parse(process.env.KATT_URLS).concat(componentsToStorybookUrls(components))