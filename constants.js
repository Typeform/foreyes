const path = require('path').resolve
exports.configFolder = 'foreyesConfig'
exports.configFilePath = path(
  process.cwd(),
  exports.configFolder,
  'foreyes.config.js'
)
