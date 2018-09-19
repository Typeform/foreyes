module.exports = (components, urls) => {
  const fs = require('fs')
  const path = require('path')
  const blue = require('chalk').blue
  const Launcher = require('webdriverio').Launcher
  const { browsers } = require(path.resolve(process.cwd(), 'foreyes.config'))
  const localPath = `${__dirname}/../../..`
  const onPromiseFailed = error => {
    console.error(error.stacktrace)
    process.exit(1)
  }

  const testCases = require(path.resolve(
    localPath,
    'src',
    'comparison',
    'getComparisonUrls'
  ))(components, urls)
  process.env.FOREYES_TESTCASES = JSON.stringify(testCases)

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
    blue(
      'Look into foreyesConfig/logs.log for more information on the execution.'
    )
  )
  fs.writeFileSync('foreyesConfig/logs.log')
  const logFile = fs.createWriteStream('foreyesConfig/logs.log')
  process.stdout.write = process.stderr.write = logFile.write.bind(logFile)

  new Launcher(baselineConfig, baselineOpts)
    .run()
    .then(() => {
      if (!browsers.includes('firefox')) return
      return new Launcher(firefoxConfig, comparisonOpts).run()
    })
    .then(() => {
      if (!browsers.includes('IE11')) return
      return new Launcher(ie11Config, comparisonOpts).run()
    })
    .then(code => process.exit(code), onPromiseFailed)
}
