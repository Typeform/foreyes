exports.command = 'test-urls'
exports.desc = 'Test Chrome against Firefox and ie11 for every provided URL'
exports.builder = {}
exports.handler = () => {
  const fs = require('fs')
  const path = require('path')
  const { configFolder } = require(path.join(
    __dirname,
    '..',
    '..',
    'constants.js'
  ))

  const urls = fs.readFileSync(
    path.join(process.cwd(), configFolder, 'fixtureUrls.json')
  )

  require(path.join(__dirname, 'support', 'runWdio.js'))([], JSON.parse(urls))
}
