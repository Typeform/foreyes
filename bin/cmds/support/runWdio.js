const fs = require('fs')
const path = require('path')
const localPath = path.join(__dirname, '..', '..', '..')
const { configFolder, configFilePath } = require(path.join(
  localPath,
  'constants.js'
))
const { screenshotsFolder, browsers } = JSON.parse(
  fs.readFileSync(configFilePath)
)
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

const deleteOldScreenshots = () => require('rmdir')(screenshotsFolder)

const launchChrome = () =>
  launchBrowser('wdio.reference.conf.js', 'runBaseline.js')

const launchMultibrowser = () => {
  const firefox = new Promise(
    resolve =>
      browsers.includes('firefox')
        ? resolve(launchBrowser('wdio.firefox.conf.js', 'runComparison.js'))
        : resolve()
  )
  const ie11 = new Promise(
    resolve =>
      browsers.includes('ie11')
        ? resolve(
          launchBrowser('wdio.ie11Browserstack.conf.js', 'runComparison.js')
        )
        : resolve()
  )
  return Promise.all([firefox, ie11])
}

const launchBrowser = (config, opts) => {
  const { Launcher } = require('webdriverio')
  const configPath = path.join(localPath, config)
  const optsPath = {
    spec: path.join(localPath, 'src/comparison/', opts)
  }
  return new Launcher(configPath, optsPath).run()
}

const report = code => {
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
  process.exit(code)
}

module.exports = (components, urls) => {
  if (
    browsers.includes('ie11') &&
    (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_KEY)
  ) {
    const { red } = require('chalk')
    console.log(
      red(
        'IE11 requires browserstack credentials, but they are not present. Please export the following ENV variables: BROWSERSTACK_USERNAME, BROWSERSTACK_KEY'
      )
    )
    return
  }

  mute()

  const testCases = require(path.join(
    localPath,
    'src',
    'comparison',
    'getComparisonUrls'
  ))(components, urls)
  process.env.FOREYES_TESTCASES = JSON.stringify(testCases)

  deleteOldScreenshots()

  launchChrome()
    .then(launchMultibrowser)
    .finally(report)
}
