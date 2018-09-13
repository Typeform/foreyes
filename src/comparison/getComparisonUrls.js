const path = require('path')
const port = require(path.resolve(process.cwd(), 'foreyes.config')).serverPort
const URL = require('url').URL

componentsToStorybookUrls = components => {
  return components.map(({componentName, type}) => {
    const name = componentName.replace(/-/g, "_")
    let outUrl = new URL('http://localhost')
    outUrl.port = port
    outUrl.pathname = "iframe.html"
    outUrl.search = `full=1&selectedStory=${type}&selectedKind=${name}`
    return outUrl.toString()
  })
}

const components = JSON.parse(process.env.COMPONENTS)
module.exports = JSON.parse(process.env.FOREYES_URLS).concat(componentsToStorybookUrls(components))