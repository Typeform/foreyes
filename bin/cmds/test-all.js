exports.command = 'test-all'
exports.desc = 'Test Chrome against Firefox, ie11 and Safari for every example'
exports.builder = {}
exports.handler = () => {
  const fs = require('fs')
  const path = require('path')
  const { configFolder, configFilePath } = require(path.join(
    __dirname,
    '..',
    '..',
    'constants.js'
  ))
  const { pathToExamples } = JSON.parse(fs.readFileSync(configFilePath))

  const components = fs.readdirSync(pathToExamples).map(value => {
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
