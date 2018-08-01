exports.command = 'test'
exports.desc = 'Test Chrome against Firefox'
exports.builder = {
  component: {
    default: undefined,
    required: true
  },
  isTemplate: {
    default: false,
    description: 'Do you want to test a custom example?'
  }
}
exports.handler = ({ component, isTemplate }) => {
  const path = require('path')
  const Launcher = require('webdriverio').Launcher
  const localPath = `${__dirname}/../..`

  process.env.COMPONENTS = JSON.stringify([
    {
      componentName: component,
      type: isTemplate ? 'custom' : 'default'
    }
  ])

  const onPromiseFailed = error => {
    console.error(error.stacktrace)
    process.exit(1)
  }

  const baselineConfig = path.resolve(localPath, 'wdio.reference.conf.js')
  const baselineOpts = {
    spec: path.resolve(localPath, 'src/comparison/runBaseline.js')
  }

  const comparisonConfig = path.resolve(localPath, 'wdio.firefox.conf.js')
  const comparisonOpts = {
    spec: path.resolve(localPath, 'src/comparison/runComparison.js')
  }
  const ie11Config = path.resolve(localPath, 'wdio.ie11Browserstack.conf.js')

  new Launcher(baselineConfig, baselineOpts).run().then(() => {
    console.log(`Saved baseline for ${component} on chrome`)

    new Launcher(comparisonConfig, comparisonOpts)
      .run()
      .then(() => new Launcher(ie11Config, comparisonOpts).run())
      .then(code => process.exit(code), onPromiseFailed)
  }, onPromiseFailed)
}
