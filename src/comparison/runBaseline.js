const componentName = process.env.COMPONENT_NAME

describe('baseline_', () => {
  it(componentName, function () {
    console.error(
      `Saved baseline for ${componentName} on ${
        browser.desiredCapabilities.browserName
      }`
    )
    browser
      .url(
        `/iframe.html?full=1&selectedStory=default&selectedKind=${componentName}`
      )
      .checkDocument()
  })
})
