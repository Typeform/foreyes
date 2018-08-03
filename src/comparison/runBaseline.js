const components = JSON.parse(process.env.COMPONENTS)
const urls = process.env.KATT_URLS ? JSON.parse(process.env.KATT_URLS) : []

describe('baseline_', () => {
  if (urls.length > 0) {
    urls.forEach((url) => {
      it(url, () => {
        process.env.SCREENSHOT_NAME = url
        browser
          .url(url)
          .checkDocument()
        console.log(`Saved chrome baseline for ${url}`)
      })
    })
  } else {
    components.forEach(({ componentName, type }) => {
      it(`${componentName}_${type}`, () => {
        process.env.SCREENSHOT_NAME = `${componentName}_${type}`
        browser
          .url(`/iframe.html?full=1&selectedStory=${type}&selectedKind=${componentName.replace(/-/g, "_")}`)
          .checkDocument()
        console.log(`Saved chrome baseline for ${componentName} (${type})`)
      })
    })
  }
})
