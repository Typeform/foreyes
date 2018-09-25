const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')
const VisualRegressionCompare = require('wdio-visual-regression-service/compare')

const path = require('path').resolve
const { configFilePath } = require('./constants.js')
const { misMatchTolerance, ignoreComparison } = require(configFilePath)

const { baseline, actual, diff } = require(path(__dirname, 'src', 'comparison', 'screenshotName.js'))
const browser = 'IE11'

exports.config = merge(
  wdioConf.config,
  {
    services: ['browserstack'],
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_KEY,
    browserstackLocal: true,

    capabilities: [{
       browserName: browser,
      'os': 'Windows',
      'os_version': '10',
      'browser': 'IE',
      'browser_version': '11.0',
      'resolution': '1680x1050',
      'project': 'Foreyes',
      'browserstack.ie.enablePopups': false,
      'browserstack.debug': true,
      'browserstack.video': false,
      'browserstack.local': true

    }],
    visualRegression: {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: context => baseline(context),
        screenshotName: context => actual(context, browser),
        diffName: context => diff(context, browser),
        misMatchTolerance: misMatchTolerance,
        ignoreComparison: ignoreComparison
      })
    },
    
  },
  { clone: false }
)