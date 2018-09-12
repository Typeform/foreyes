const path = require('path')
const urls = require(path.resolve(__dirname, 'getComparisonUrls'))
const green = require('chalk').green

describe('baseline_', () => {
  urls.forEach((url) => {
    it(url, () => {
      browser
        .url(url)
        .checkDocument()
      console.log(green(`${url}: saved chrome baseline`))
    })
  })
})
