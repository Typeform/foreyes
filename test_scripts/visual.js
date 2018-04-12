load('../galenTestData.js')
load('config.js')
load('componentsWithVisualTest.js')

forAll(browsers, function () {
  forAll(devices, function () {
    visualTestableComponents.forEach(function (component) {
      test("Test on " + component, function (browser, device) {
        var pageName = component.replace(/-/g, "_") //replace -s with _s in the name
        var driver = createDriver("localhost:8080/" + pageName, device.size, browser.name);
        driver.takeScreenshot();
        driver.quit();
      });
    });
  });
});