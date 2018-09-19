const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')
const VisualRegressionCompare = require('wdio-visual-regression-service/compare')

const path = require('path')
const config = require(path.resolve(process.cwd(), 'foreyesConfig', 'foreyes.config'))

const { baseline, actual, diff } = require(path.resolve(__dirname, 'src', 'comparison', 'screenshotName.js'))
const browser = 'firefox'

exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        maxInstances: 1,
        browserName: browser,
        "moz:firefoxOptions":{"args":["-headless"]}
      }
    ],
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