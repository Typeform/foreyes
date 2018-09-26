const path = require('path')
const { configFilePath } = require(path.join(
  __dirname,
  '..',
  '..',
  'constants.js'
))
const config = require(configFilePath)
const fs = require('fs')

module.exports = () => {
  const basePath = config.path_to_components
  const blacklist = config.component_folder_blacklist
  const isntBlacklisted = name => !blacklist.includes(path.basename(name))
  const isFolder = name => fs.lstatSync(`${basePath}${name}`).isDirectory()

  return fs
    .readdirSync(basePath)
    .filter(isFolder)
    .filter(isntBlacklisted)
}
