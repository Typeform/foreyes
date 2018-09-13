const path = require('path')
const config = require(path.resolve(process.cwd(), 'foreyes.config'))
const file = require('fs')

module.exports = () => {
  const basePath = config.path_to_components
  const blacklist = config.component_folder_blacklist
  const isntBlacklisted = name => !blacklist.includes(path.basename(name))
  const isFolder = name => file.lstatSync(`${basePath}${name}`).isDirectory()

  return file
    .readdirSync(basePath)
    .filter(isFolder)
    .filter(isntBlacklisted)
}
