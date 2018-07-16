const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

const VisualRegressionCompare = require('wdio-visual-regression-service/compare')

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
        referenceName: () => `./screenshots/${context.test.title}.png`,
        screenshotName: () => `./screenshots/${context.test.title}_actual.png`,
        diffName: () => `./screenshots/${context.test.title}_diff.png`,
        misMatchTolerance: 0,
        ignoreComparison: "antialiasing"
      })
    }
  },
  { clone: false }
)
