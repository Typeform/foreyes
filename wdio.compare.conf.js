const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

const VisualRegressionCompare = require('wdio-visual-regression-service/compare')
const screenshot_name = process.env.SCREENSHOT_NAME

exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        maxInstances: 5,
        browserName: 'firefox'
      }
    ],
    visualRegression: {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: () => `./screenshots/${process.env.COMPONENT_NAME}.png`,
        screenshotName: () => `./screenshots/${process.env.COMPONENT_NAME}_actual.png`,
        diffName: () => `./screenshots/${process.env.COMPONENT_NAME}_diff.png`,
        misMatchTolerance: 0,
        ignoreComparison: "antialiasing"
      })
    }
  },
  { clone: false }
)
