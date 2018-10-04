const testCases = JSON.parse(process.env.FOREYES_TESTCASES)
const { green, red } = require('chalk')

describe(`${browser.desiredCapabilities.browserName}_`, () => {
  testCases.forEach(({name, url}) => {
    it(name, () => {
      const report = browser
        .url(url)
        .checkDocument()

      report.forEach(result => {
        const generalInfo = `${name} in ${browser.desiredCapabilities.browserName}`
        if (result.isWithinMisMatchTolerance) {
          console.log(green(`✨  PASS: ${generalInfo}.`))
        } else {
          const errorMsg = `💔  FAIL: ${generalInfo} is ${result.misMatchPercentage}% different.`
          console.log(red(errorMsg))
          throw new Error(errorMsg)
        }
      })
    })
  })
})
