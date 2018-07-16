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
        referenceName: () => `./screenshots/button.png`,
        screenshotName: () => `./screenshots/button_actual.png`,
        diffName: () => `./screenshots/button_diff.png`,
        misMatchTolerance: 2,
        ignoreComparison: 'antialiasing'
      })
    }
  },
  { clone: false }
)
