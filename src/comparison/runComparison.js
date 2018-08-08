const components = JSON.parse(process.env.COMPONENTS)
const componentsToStorybookUrls = require('./componentsToStorybookUrls')
const urls = JSON.parse(process.env.KATT_URLS).concat(componentsToStorybookUrls(components))

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
