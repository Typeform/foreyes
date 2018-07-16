const components = JSON.parse(process.env.COMPONENTS)

describe('baseline_', () => {
  components.forEach(({ componentName, type }) => {
    it(`${componentName}_${type}`, () => {
      process.env.SCREENSHOT_NAME = `${componentName}_${type}`
      browser
        .url(`/iframe.html?full=1&selectedStory=${type}&selectedKind=${componentName}`)
        .checkDocument()
        console.log(`Saved chrome baseline for ${componentName} (${type})`)
    })
  })
})
