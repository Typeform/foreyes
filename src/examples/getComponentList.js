const fs = require('fs')
const path = require('path')
const { configFilePath } = require(path.join(
  __dirname,
  '..',
  '..',
  'constants.js'
))
const { pathToComponents, componentFolderBlacklist } = JSON.parse(
  fs.readFileSync(configFilePath)
)

module.exports = () => {
  const isBlacklisted = name =>
    componentFolderBlacklist.includes(path.basename(name))
  const isFolder = name =>
    fs.lstatSync(`${pathToComponents}${name}`).isDirectory()

  return fs
    .readdirSync(pathToComponents)
    .filter(isFolder)
    .filter(path => !isBlacklisted(path))
}
