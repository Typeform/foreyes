const testCases = JSON.parse(process.env.FOREYES_TESTCASES)
const green = require('chalk').green

describe('baseline_', () => {
  testCases.forEach(({name, url}) => {
    it(name, () => {
      browser
        .url(url)
        .checkDocument()
      console.log(green(`📸  ${name}: saved chrome baseline`))
    })
  })
})
