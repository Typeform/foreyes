const { resolve, basename } = require('path')
const { configFilePath } = require(resolve(
  __dirname,
  '..',
  '..',
  'constants.js'
))
const {
  path_to_components,
  component_folder_blacklist
} = require(configFilePath)
const fs = require('fs')

module.exports = () => {
  const basePath = path_to_components
  const blacklist = component_folder_blacklist
  const isntBlacklisted = name => !blacklist.includes(basename(name))
  const isFolder = name => fs.lstatSync(`${basePath}${name}`).isDirectory()

  return fs
    .readdirSync(basePath)
    .filter(isFolder)
    .filter(isntBlacklisted)
}
