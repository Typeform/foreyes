const testCases = JSON.parse(process.env.FOREYES_TESTCASES)
const chalk = require('chalk')

describe(`${browser.desiredCapabilities.browserName}_`, () => {
  testCases.forEach(({name, url}) => {
    it(name, () => {
      const report = browser
        .url(url)
        .checkDocument()

      report.forEach(result => {
        if (result.isWithinMisMatchTolerance) {
          console.log(chalk.green(`✨  PASS: ${name} in ${browser.desiredCapabilities.browserName}.`))
        } else {
          const errorMsg = `💔  FAIL: ${name} in ${browser.desiredCapabilities.browserName} is ${result.misMatchPercentage}% different.`
          console.log(chalk.red(errorMsg))
          throw new Error(errorMsg)
        }
      })
    })
  })
})
