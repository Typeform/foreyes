const path = require('path')
const config = require(path.resolve(process.cwd(), 'katt.config'))
module.exports = (components) => {
  return components.map(({componentName, type}) => {
    return `http://localhost:${config.serverPort || 8080}/iframe.html?full=1&selectedStory=${type}&selectedKind=${componentName.replace(/-/g, "_")}`
  })
}