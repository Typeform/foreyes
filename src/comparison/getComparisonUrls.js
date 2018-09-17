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

parseUrls = urls => urls.map(url => {
  const {host, pathname} = new URL(url)
    return {
    name: `${host}${pathname}`,
      url: url
    }
})

module.exports = (components, urls) => parseUrls(urls).concat(componentsToStorybookUrls(components))