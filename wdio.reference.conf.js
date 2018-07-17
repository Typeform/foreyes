const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

const VisualRegressionCompare = require('wdio-visual-regression-service/compare')
const getBaseName = ({test, meta}) => `${test.title}_${meta.viewport.width}x${meta.viewport.height}`

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
        screenshotName: context => `./screenshots/${getBaseName(context)}.png`
      })
    }
  },
  { clone: false }
)
