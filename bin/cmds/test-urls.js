exports.command = 'test-urls'
exports.desc = 'Test Chrome against Firefox and IE11 for every provided URL'
exports.builder = {}
exports.handler = () => {
  const fs = require('fs')
  const path = require('path')

  const urls = fs.readFileSync(
    path.resolve(process.cwd(), 'kattConfig/fixtureUrls.json')
  )

  require(path.resolve(__dirname, 'support', 'runWdio.js'))(
    [],
    JSON.parse(urls)
  )
}
