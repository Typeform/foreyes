const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

const VisualRegressionCompare = require('wdio-visual-regression-service/compare')
const screenshot_name = `${process.env.COMPONENT_NAME}_${process.env.EXAMPLE_TYPE}`

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
        referenceName: () => `./screenshots/${screenshot_name}_baseline.png`,
        screenshotName: () => `./screenshots/${screenshot_name}_firefox.png`,
        diffName: () => `./screenshots/${screenshot_name}_diff.png`,
        misMatchTolerance: 0,
        ignoreComparison: "antialiasing"
      })
    }
  },
  { clone: false }
)
