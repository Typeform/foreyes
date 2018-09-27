const path = require('path')
const { readFileSync } = require('fs')
const { URL } = require('url')
const { configFilePath } = require(path.join(
  '..', '..',
  'constants.js'
))
const { serverPort } = JSON.parse(readFileSync(configFilePath))

componentsToStorybookUrls = components => {
  return components.map(({ componentName, type }) => {
    const name = componentName.replace(/-/g, "_")
    const outUrl = new URL('http://localhost')
    outUrl.port = serverPort
    outUrl.pathname = "iframe.html"
    outUrl.search = `full=1&selectedStory=${type}&selectedKind=${name}`
    return {
      name: componentName,
      url: outUrl.toString()
    }
  })
}

parseUrls = urls => urls.map(url => {
  const { host, pathname } = new URL(url)
  return {
    name: `${host}${pathname}`,
    url: url
  }
})

module.exports = (components, urls) => parseUrls(urls).concat(componentsToStorybookUrls(components))
