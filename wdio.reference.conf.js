var merge = require('deepmerge')
var wdioConf = require('./wdio.conf.js')

var VisualRegressionCompare = require('wdio-visual-regression-service/compare')

exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        maxInstances: 1,
        browserName: 'chrome'
      }
    ],
    visualRegression: {
      compare: new VisualRegressionCompare.SaveScreenshot({
        screenshotName: context => `./screenshots/button.png`
      })
    }
  },
  { clone: false }
)
