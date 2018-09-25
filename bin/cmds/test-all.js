exports.command = 'test-all'
exports.desc = 'Test Chrome against Firefox and IE11 for every example'
exports.builder = {}
exports.handler = () => {
  const fs = require('fs')
  const path = require('path').resolve
  const { configFilePath, configFolder } = require(path(
    __dirname,
    '..',
    '..',
    'constants.js'
  ))
  const { path_to_examples } = require(configFilePath)

  const components = fs.readdirSync(path_to_examples).map(value => {
    const [componentName, exampleType] = value.split('.')
    return {
      componentName: componentName,
      type: exampleType === 'customExample' ? 'custom' : 'default'
    }
  })

  const urls = fs.readFileSync(
    path(process.cwd(), configFolder, 'fixtureUrls.json')
  )

  require(path(__dirname, 'support', 'runWdio.js'))(
    components,
    JSON.parse(urls)
  )
}
