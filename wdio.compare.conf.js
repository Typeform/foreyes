var merge = require('deepmerge')
var wdioConf = require('./wdio.conf.js')

var VisualRegressionCompare = require('wdio-visual-regression-service/compare')

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
