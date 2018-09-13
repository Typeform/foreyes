const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')
const VisualRegressionCompare = require('wdio-visual-regression-service/compare')

const path = require('path')
const config = require(path.resolve(process.cwd(), 'foreyes.config'))

const getBaseName = ({ test, meta }) => `${test.title}_${meta.viewport.width}x${meta.viewport.height}`

exports.config = merge(
  wdioConf.config,
  {
    services: ['browserstack'],
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_KEY,
    browserstackLocal: true,

    capabilities: [{
       browserName: 'IE11',
      'os': 'Windows',
      'os_version': '10',
      'browser': 'IE',
      'browser_version': '11.0',
      'resolution': '1680x1050',
      'project': 'Foreyes',
      'browserstack.ie.enablePopups': false,
      'browserstack.debug': true,
      'browserstack.video': false,
      'browserstack.local': true

    }],
    visualRegression: {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: context => `./screenshots/${getBaseName(context)}.png`,
        screenshotName: context => `./screenshots/${getBaseName(context)}_actual_ie11.png`,
        diffName: context => `./screenshots/${getBaseName(context)}_difference_with_ie11.png`,
        misMatchTolerance: config.misMatchTolerance,
        ignoreComparison: config.ignoreComparison
      })
    },
    
  },
  { clone: false }
)