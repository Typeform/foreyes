const path = require('path')
exports.configFolder = 'foreyesConfig'
exports.configFilePath = path.join(
  process.cwd(),
  exports.configFolder,
  'foreyes.config.js'
)
