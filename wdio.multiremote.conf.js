const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')
const VisualRegressionCompare = require('wdio-visual-regression-service/compare')
const fs = require('fs')
//const webdriverio = require('webdriverio');


const path = require('path')
const { configFilePath } = require(path.join(
  __dirname,
  'constants.js'
))
const config = JSON.parse(
  fs.readFileSync(configFilePath)
)
const { baseline, actual, diff } = require(path.join(__dirname, 'src', 'comparison', 'screenshotName.js'))

const browser = 'penedenegro'
exports.config = merge(
  wdioConf.config,
  {
    capabilities: [{
      // ie11Browser: {
      //   services: ['browserstack'],
      //   user: process.env.BROWSERSTACK_USERNAME,
      //   key: process.env.BROWSERSTACK_KEY,
      //   browserstackLocal: true,
      //   desiredCapabilities: [{
      //     browserName: 'IE11',
      //     'os': 'Windows',
      //     'os_version': '10',
      //     'browser': 'IE',
      //     'browser_version': '11.0',
      //     'resolution': '1680x1050',
      //     'project': 'Foreyes',
      //     'browserstack.ie.enablePopups': false,
      //     'browserstack.debug': true,
      //     'browserstack.video': false,
      //     'browserstack.local': true
      //   }]
      // },
      firefoxBrowser: {
        desiredCapabilities: [{
          browserName: 'firefox',
          "moz:firefoxOptions": { "args": ["-headless"] }
        }]
      },
      maxInstances: 1
    }],
    visualRegression: {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: context => baseline(context),
        screenshotName: context => actual(context, browser),
        diffName: context => diff(context, browser),
        misMatchTolerance: config.misMatchTolerance,
        ignoreComparison: config.ignoreComparison
      })
    }
  },
  { clone: false }
)