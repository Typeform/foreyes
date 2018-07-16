const components = JSON.parse(process.env.COMPONENTS)
let failed = false
describe(`${browser.desiredCapabilities.browserName}_`, () => {
  components.forEach(({ componentName, type }) => {
    it(`${componentName}_${type}`, () => {
      process.env.SCREENSHOT_NAME = `${componentName}_${type}`
      const report = browser
        .url(`/iframe.html?full=1&selectedStory=${type}&selectedKind=${componentName}`)
        .checkDocument()

      report.forEach(result => {
        if (!result.isWithinMisMatchTolerance) {
          console.error(`TEST FAIL: ${componentName} is ${result.misMatchPercentage}% different in Firefox.`)
          failed = true
        } else {
          console.log(`TEST PASS: ${componentName} in Firefox.`)
        }
      })
    })
  })
})
