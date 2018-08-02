const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')
const VisualRegressionCompare = require('wdio-visual-regression-service/compare')

const path = require('path')
const config = require(path.resolve(process.cwd(), 'katt.config'))

const getBaseName = ({test, meta}) => `${test.title}_${meta.viewport.width}x${meta.viewport.height}`

exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        maxInstances: 1,
        browserName: 'firefox',
        "moz:firefoxOptions":{"args":["-headless"]}
      }
    ],
    visualRegression: {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: context => `./screenshots/${getBaseName(context)}.png`,
        screenshotName: context => `./screenshots/${getBaseName(context)}_actual_firefox.png`,
        diffName: context => `./screenshots/${getBaseName(context)}_diff_with_firefox.png`,
        misMatchTolerance: config.misMatchTolerance,
        ignoreComparison: config.ignoreComparison
      })
    }
  },
  { clone: false }
)