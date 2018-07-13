const componentName = process.env.COMPONENT_NAME
const storyType = process.env.EXAMPLE_TYPE

describe('baseline_', () => {
  it(componentName, function () {
    browser
      .url(
        `/iframe.html?full=1&selectedStory=${storyType}&selectedKind=${componentName}`
      )
      .checkDocument()
  })
})
