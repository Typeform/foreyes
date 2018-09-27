const fs = require('fs')
const path = require('path')
const localPath = path.join(__dirname, '..', '..', '..')
const { configFolder, configFilePath } = require(path.join(
  localPath,
  'constants.js'
))
const { browsers } = JSON.parse(fs.readFileSync(configFilePath))
const outwrite = process.stdout.write
const errwrite = process.stderr.write

const mute = () => {
  const logFilePath = path.join(configFolder, 'logs.log')
  fs.writeFileSync(logFilePath)
  const logFile = fs.createWriteStream(logFilePath)
  process.stdout.write = process.stderr.write = logFile.write.bind(logFile)
}

const unmute = () => {
  process.stdout.write = outwrite
  process.stderr.write = errwrite
}

const launchChrome = () =>
  launchBrowser('wdio.reference.conf.js', 'runBaseline.js')
const launchFirefox = () =>
  browsers.includes('firefox')
    ? launchBrowser('wdio.firefox.conf.js', 'runComparison.js')
    : undefined
const launchie11 = () =>
  browsers.includes('ie11')
    ? launchBrowser('wdio.ie11Browserstack.conf.js', 'runComparison.js')
    : undefined

const launchBrowser = (config, opts) => {
  const { Launcher } = require('webdriverio')
  const configPath = path.join(localPath, config)
  const optsPath = {
    spec: path.join(localPath, 'src/comparison/', opts)
  }
  return new Launcher(configPath, optsPath).run()
}

const report = () => {
  const { blue } = require('chalk')
  const generateReport = require(path.join(
    localPath,
    'src/comparison',
    'generateReport'
  ))

  generateReport()

  unmute()
  console.log(
    blue(
      `Here's the execution report: ${process.cwd()}/${configFolder}/report/index.html`
    )
  )
}

module.exports = (components, urls) => {
  mute()

  const testCases = require(path.join(
    localPath,
    'src',
    'comparison',
    'getComparisonUrls'
  ))(components, urls)
  process.env.FOREYES_TESTCASES = JSON.stringify(testCases)

  launchChrome()
    .then(launchFirefox)
    .then(launchie11)
    .finally(report)
}
