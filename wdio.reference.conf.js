const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

const VisualRegressionCompare = require('wdio-visual-regression-service/compare')

const path = require('path')
const getScreenshotName = require(path.join(__dirname, 'src', 'comparison', 'screenshotName')).baseline

exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        maxInstances: 1,
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
        }
      }
    ],
    visualRegression: {
      compare: new VisualRegressionCompare.SaveScreenshot({
        screenshotName: context => getScreenshotName(context)
      })
    }
  },
  { clone: false }
)
