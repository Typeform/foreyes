const path = require('path')
const urls = require(path.resolve(__dirname, 'getComparisonUrls'))
const chalk = require('chalk')

describe('baseline_', () => {
  urls.forEach((url) => {
    it(url, () => {
      browser
        .url(url)
        .checkDocument()
      console.log(chalk.green(`${url}: saved chrome baseline`))
    })
  })
})
