const components = JSON.parse(process.env.COMPONENTS)
const urls = process.env.KATT_URLS ? JSON.parse(process.env.KATT_URLS) : []

describe(`${browser.desiredCapabilities.browserName}_`, () => {
  if (urls.length > 0) {
    urls.forEach((url) => {
      it(url, () => {
        process.env.SCREENSHOT_NAME = url
        const report = browser
          .url(url)
          .checkDocument()

        report.forEach(result => {
          if (!result.isWithinMisMatchTolerance) {
            console.error(`TEST FAIL: ${url} is ${result.misMatchPercentage}% different in ${browser.desiredCapabilities.browserName}.`)
          } else {
            console.log(`TEST PASS: ${url} in ${browser.desiredCapabilities.browserName}.`)
          }
        })
      })
    })
  } else {
    components.forEach(({ componentName, type }) => {
      it(`${componentName}_${type}`, () => {
        process.env.SCREENSHOT_NAME = `${componentName}_${type}`
        const report = browser
          .url(`/iframe.html?full=1&selectedStory=${type}&selectedKind=${componentName.replace(/-/g, "_")}`)
          .checkDocument()

        report.forEach(result => {
          if (!result.isWithinMisMatchTolerance) {
            console.error(`TEST FAIL: ${componentName} (${type}) is ${result.misMatchPercentage}% different in ${browser.desiredCapabilities.browserName}.`)
          } else {
            console.log(`TEST PASS: ${componentName} (${type}) in ${browser.desiredCapabilities.browserName}.`)
          }
        })
      })
    })
  }
})
