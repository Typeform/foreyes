module.exports = (components, urls) => {
  const fs = require('fs')
  const path = require('path')
  const blue = require('chalk').blue
  const Launcher = require('webdriverio').Launcher
  const { configFilePath } = require(path.join(
    __dirname,
    '..',
    '..',
    '..',
    'constants.js'
  ))
  const { browsers } = require(configFilePath)
  const localPath = `${__dirname}/../../..`
  const generateReport = require(path.join(
    localPath,
    'src/comparison',
    'generateReport'
  ))
  const onPromiseFailed = error => {
    console.error(error.stacktrace)
    process.exit(1)
  }

  const testCases = require(path.join(
    localPath,
    'src',
    'comparison',
    'getComparisonUrls'
  ))(components, urls)
  process.env.FOREYES_TESTCASES = JSON.stringify(testCases)

  const baselineConfig = path.join(localPath, 'wdio.reference.conf.js')
  const baselineOpts = {
    spec: path.join(localPath, 'src/comparison/runBaseline.js')
  }

  const firefoxConfig = path.join(localPath, 'wdio.firefox.conf.js')
  const comparisonOpts = {
    spec: path.join(localPath, 'src/comparison/runComparison.js')
  }
  const ie11Config = path.join(localPath, 'wdio.ie11Browserstack.conf.js')

  const outwrite = process.stdout.write
  const errwrite = process.stderr.write
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
      if (!browsers.includes('ie11')) return
      return new Launcher(ie11Config, comparisonOpts).run()
    })
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
