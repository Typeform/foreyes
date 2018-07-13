const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

const VisualRegressionCompare = require('wdio-visual-regression-service/compare')
const screenshot_name = `${process.env.COMPONENT_NAME}_${process.env.EXAMPLE_TYPE}`

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
        screenshotName: context => `./screenshots/${screenshot_name}_baseline.png`
      })
    }
  },
  { clone: false }
)
