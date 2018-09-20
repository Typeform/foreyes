module.exports = (components, urls) => {
  const fs = require('fs')
  const path = require('path')
  const blue = require('chalk').blue
  const Launcher = require('webdriverio').Launcher
  const localPath = `${__dirname}/../../..`
  const generateReport = require(path.resolve(
    localPath,
    'src/comparison',
    'generateReport'
  ))
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

  const outwrite = process.stdout.write
  const errwrite = process.stderr.write
  fs.writeFileSync('foreyesConfig/logs.log')
  const logFile = fs.createWriteStream('foreyesConfig/logs.log')
  process.stdout.write = process.stderr.write = logFile.write.bind(logFile)

  new Launcher(baselineConfig, baselineOpts)
    .run()
    .then(() => new Launcher(firefoxConfig, comparisonOpts).run())
    .then(() => new Launcher(ie11Config, comparisonOpts).run())
    .then(code => {
      if (code !== 0) {
        generateReport()
        process.stdout.write = outwrite
        process.stderr.write = errwrite
        console.log(
          blue(
            `Some tests failed. Here's the report: ${process.cwd()}/foreyesConfig/report/index.html`
          )
        )
      }
      process.exit(code)
    }, onPromiseFailed)
}
