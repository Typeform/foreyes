module.exports = (components, urls) => {
  process.env.COMPONENTS = JSON.stringify(components)
  process.env.KATT_URLS = JSON.stringify(urls)

  const fs = require('fs')
  const path = require('path')
  const blue = require('chalk').blue
  const Launcher = require('webdriverio').Launcher
  const localPath = `${__dirname}/../../..`
  const onPromiseFailed = error => {
    console.error(error.stacktrace)
    process.exit(1)
  }

  const baselineConfig = path.resolve(localPath, 'wdio.reference.conf.js')
  const baselineOpts = {
    spec: path.resolve(localPath, 'src/comparison/runBaseline.js')
  }

  const firefoxConfig = path.resolve(localPath, 'wdio.firefox.conf.js')
  const comparisonOpts = {
    spec: path.resolve(localPath, 'src/comparison/runComparison.js')
  }
  const ie11Config = path.resolve(localPath, 'wdio.ie11Browserstack.conf.js')

  console.log(
    blue('Look into kattConfig/logs.log for more information on the execution.')
  )
  fs.writeFileSync('kattConfig/logs.log')
  const logFile = fs.createWriteStream('kattConfig/logs.log')
  process.stdout.write = process.stderr.write = logFile.write.bind(logFile)

  new Launcher(baselineConfig, baselineOpts)
    .run()
    .then(() => new Launcher(firefoxConfig, comparisonOpts).run())
    .then(() => new Launcher(ie11Config, comparisonOpts).run())
    .then(code => process.exit(code), onPromiseFailed)
}
