const path = require('path')
const urls = require(path.resolve(__dirname, 'getComparisonUrls'))

describe('baseline_', () => {
  urls.forEach((url) => {
    it(url, () => {
      browser
        .url(url)
        .checkDocument()
      console.log(`Saved chrome baseline for ${url}`)
    })
  })
})
