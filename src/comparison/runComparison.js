const path = require('path')
const urls = require(path.resolve(__dirname, 'getComparisonUrls'))

describe(`${browser.desiredCapabilities.browserName}_`, () => {
  urls.forEach((url) => {
    it(url, () => {
      const report = browser
        .url(url)
        .checkDocument()

      report.forEach(result => {
        if (result.isWithinMisMatchTolerance) {
          console.log(`TEST PASS: ${url} in ${browser.desiredCapabilities.browserName}.`)
        } else {
          throw new Error(`TEST FAIL: ${url} is ${result.misMatchPercentage}% different in ${browser.desiredCapabilities.browserName}.`)
        }
      })
    })
  })
})
