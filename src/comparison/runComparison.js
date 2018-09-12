const path = require('path')
const urls = require(path.resolve(__dirname, 'getComparisonUrls'))
const chalk = require('chalk')

describe(`${browser.desiredCapabilities.browserName}_`, () => {
  urls.forEach((url) => {
    it(url, () => {
      const report = browser
        .url(url)
        .checkDocument()

      report.forEach(result => {
        if (result.isWithinMisMatchTolerance) {
          console.log(chalk.green(`✨ PASS: ${url} in ${browser.desiredCapabilities.browserName}.`))
        } else {
          const errorMsg = `💔 FAIL: ${url} in ${browser.desiredCapabilities.browserName} is ${result.misMatchPercentage}% different.`
          console.log(chalk.red(errorMsg))
          throw new Error(errorMsg)
        }
      })
    })
  })
})
