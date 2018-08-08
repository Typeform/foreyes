const components = JSON.parse(process.env.COMPONENTS)
const componentsToStorybookUrls = require('./componentsToStorybookUrls')
const urls = JSON.parse(process.env.KATT_URLS).concat(componentsToStorybookUrls(components))
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
