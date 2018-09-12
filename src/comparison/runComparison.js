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
          console.log(chalk.green(`PASS: ${url} in ${browser.desiredCapabilities.browserName}.`))
        } else {
          console.log(chalk.red(`FAIL: ${url} in ${browser.desiredCapabilities.browserName} is ${result.misMatchPercentage}% different.`))
          throw new Error(`FAIL: ${url} in ${browser.desiredCapabilities.browserName} is ${result.misMatchPercentage}% different.`)
        }
      })
    })
  })
})
