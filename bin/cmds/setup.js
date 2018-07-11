exports.command = 'setup'
exports.desc = 'Copies necessary files into your root, under kattConfig folder'
exports.builder = {}
exports.handler = () => {
  const path = require('path')
  const packagePath = path.resolve(__dirname, '..', '..')
  const fs = require('fs')
  const configFolderName = 'kattConfig'

  fs.mkdirSync(configFolderName)
  fs.copyFileSync(
    path.resolve(packagePath, 'katt.config.dist.js'), 
    'katt.config.js'
  )
  fs.copyFileSync(path.resolve(packagePath, 'decorator.dist.js'), path.resolve(configFolderName, 'decorator.js'))
  require('ncp').ncp(path.resolve(packagePath, '.storybook/'), path.resolve(configFolderName, '.storybook/'))
}
