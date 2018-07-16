exports.command = 'visual-test-all'
exports.desc = 'Test Chrome against Firefox for every example'
exports.builder = {}
exports.handler = () => {
  const fs = require('fs')
  const localPath = `${__dirname}/../..`
  const path = require('path')
  const pathToExamples = require(path.resolve(process.cwd(), 'katt.config.js')).path_to_examples
  const Launcher = require('webdriverio').Launcher

  const components = fs.readdirSync(pathToExamples)
    .map(value => {
      [componentName, exampleType] = value.split('.')
      return {
        componentName: componentName,
        type: exampleType == 'customExample' ? 'custom' : 'default'
      }
    })

  process.env.COMPONENTS = JSON.stringify(components)

  const onPromiseFailed = (error) => {
    console.error(error.stacktrace);
    process.exit(1);
  }

  const baselineConfig = path.resolve(localPath, 'wdio.reference.conf.js')
  const baselineOpts = { spec: path.resolve(localPath, 'src/comparison/runBaseline.js') }

  const comparisonConfig = path.resolve(localPath, 'wdio.compare.conf.js')
  const comparisonOpts = {spec: path.resolve(localPath,'src/comparison/runComparison.js')}

  new Launcher(baselineConfig, baselineOpts)
    .run().then(
      () => {
        new Launcher(comparisonConfig, comparisonOpts)
        .run().then( 
          code => process.exit(code),
          onPromiseFailed
        )
      },
      onPromiseFailed
    )

}
