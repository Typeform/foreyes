const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')
const VisualRegressionCompare = require('wdio-visual-regression-service/compare')

const path = require('path')
const config = require(path.resolve(process.cwd(), 'katt.config'))

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
        referenceName: context => `./screenshots/${context.test.title}.png`,
        screenshotName: context => `./screenshots/${context.test.title}_actual.png`,
        diffName: context => `./screenshots/${context.test.title}_diff.png`,
        misMatchTolerance: config.misMatchTolerance,
        ignoreComparison: config.ignoreComparison
      })
    }
  },
  { clone: false }
)