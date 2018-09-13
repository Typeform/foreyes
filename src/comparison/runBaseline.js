const path = require('path')
const urls = require(path.resolve(__dirname, 'getComparisonUrls'))
const green = require('chalk').green

describe('baseline_', () => {
  urls.forEach(({name, url}) => {
    it(name, () => {
      browser
        .url(url)
        .checkDocument()
      console.log(green(`📸  ${name}: saved chrome baseline`))
    })
  })
})
