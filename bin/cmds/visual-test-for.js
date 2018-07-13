exports.command = 'visual-test-for'
exports.desc = 'Test Chrome against Firefox'
exports.builder = {
  component: {
    default: undefined
  },
  isTemplate: {
    default: false
  }
}
exports.handler = ({ component, isTemplate }) => {
  const path = require('path')
  const Launcher = require('webdriverio').Launcher
  
  process.env.COMPONENT_NAME = component
  process.env.EXAMPLE_TYPE = isTemplate ? "custom" : "default"
  const localPath = `${__dirname}/../..`

  const onPromiseFailed = (error) => {
    console.error(error.stacktrace);
    process.exit(1);
  }

  const baselineConfig = path.resolve(localPath, 'wdio.reference.conf.js')
  const baselineOpts = {
    spec: path.resolve(localPath,'src/comparison/runBaseline.js'),
    logLevel: 
  }

  const comparisonConfig = path.resolve(localPath, 'wdio.compare.conf.js')
  const comparisonOpts = {spec: path.resolve(localPath,'src/comparison/runComparison.js')}

  new Launcher(baselineConfig, baselineOpts)
  .run().then( 
    () => {
      console.log(`Saved baseline for ${component} on chrome`)

      new Launcher(comparisonConfig, comparisonOpts)
      .run().then( 
        (code) => process.exit(code),
        onPromiseFailed
      )
    },
    onPromiseFailed
)



}
