exports.command = 'test-all'
exports.desc = 'Test Chrome against Firefox and IE11 for every example'
exports.builder = {}
exports.handler = () => {
  const fs = require('fs')
  const path = require('path')
  const { configFilePath, configFolder } = require(path.join(
    __dirname,
    '..',
    '..',
    'constants.js'
  ))
  const config = require(configFilePath)

  const components = fs.readdirSync(config.path_to_examples).map(value => {
    const [componentName, exampleType] = value.split('.')
    return {
      componentName: componentName,
      type: exampleType === 'customExample' ? 'custom' : 'default'
    }
  })

  const urls = fs.readFileSync(
    path.join(process.cwd(), configFolder, 'fixtureUrls.json')
  )

  require(path.join(__dirname, 'support', 'runWdio.js'))(
    components,
    JSON.parse(urls)
  )
}
