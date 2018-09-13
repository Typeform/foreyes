exports.command = 'test-all'
exports.desc = 'Test Chrome against Firefox and IE11 for every example'
exports.builder = {}
exports.handler = () => {
  const fs = require('fs')
  const path = require('path')
  const pathToExamples = require(path.resolve(
    process.cwd(),
    'foreyes.config.js'
  )).path_to_examples

  const components = fs.readdirSync(pathToExamples).map(value => {
    const [componentName, exampleType] = value.split('.')
    return {
      componentName: componentName,
      type: exampleType === 'customExample' ? 'custom' : 'default'
    }
  })

  const urls = fs.readFileSync(
    path.resolve(process.cwd(), 'foreyesConfig/fixtureUrls.json')
  )

  require(path.resolve(__dirname, 'support', 'runWdio.js'))(
    components,
    JSON.parse(urls)
  )
}
