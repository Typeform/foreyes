const path = require('path')
const port = require(path.resolve(process.cwd(), 'foreyes.config')).serverPort
const URL = require('url').URL

componentsToStorybookUrls = components => {
  return components.map(({ componentName, type }) => {
    const name = componentName.replace(/-/g, "_")
    let outUrl = new URL('http://localhost')
    outUrl.port = port
    outUrl.pathname = "iframe.html"
    outUrl.search = `full=1&selectedStory=${type}&selectedKind=${name}`
    return {
      name: componentName,
      url: outUrl.toString()
    }
  })
}

parseUrls = urls => {
  return urls.map(url => {
    const u = new URL(url)
    return {
      name: `${u.host}${u.pathname}`,
      url: url
    }
  })
}

const components = JSON.parse(process.env.COMPONENTS)
const urls = parseUrls(JSON.parse(process.env.FOREYES_URLS))
module.exports = urls.concat(componentsToStorybookUrls(components))