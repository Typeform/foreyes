const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')
const VisualRegressionCompare = require('wdio-visual-regression-service/compare')
const fs = require('fs')

const path = require('path')
const { configFilePath } = require(path.join(
  __dirname,
  'constants.js'
))
const config = JSON.parse(
  fs.readFileSync(configFilePath)
)
const { baseline, actual, diff } = require(path.join(__dirname, 'src', 'comparison', 'screenshotName.js'))
const browser = 'Safari'

exports.config = merge(
  wdioConf.config,
  {
    services: ['browserstack'],
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_KEY,
    browserstackLocal: true,

    capabilities: [{
      browserName: browser,
      'os': 'OS X',
      'os_version': 'Mojave',
      'browser': 'Safari',
      'browser_version': '12.0',
      'browserstack.local': 'false',
      'browserstack.selenium_version': '3.5.2',
      'resolution': '1920x1080',
      'project': 'Foreyes',
      'browserstack.debug': true,
      'browserstack.video': false,
      'browserstack.local': true
    }],
    visualRegression: {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: context => baseline(context),
        screenshotName: context => actual(context, browser),
        diffName: context => diff(context, browser),
        misMatchTolerance: config.misMatchTolerance,
        ignoreComparison: config.ignoreComparison
      })
    },

  },
  { clone: false }
)