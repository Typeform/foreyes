load('../galenTestData.js')
load('componentsWithLayoutTest.js')
load('readConfigFile.js');

forAll(browsers, function () {
  forAll(devices, function () {
    layoutTestableComponents.forEach(function (component) {
      test("Test on " + component, function (browser, device) {
        var pageName = component.replace(/-/g, "_") //replace -s with _s in the name
        var driver = createDriver("localhost:"+ config["PORT"] +"/" + pageName, device.size, browser.name);
        checkLayout(driver, config["PATH_TO_COMPONENTS"]  + component + "/" + component + ".gspec");
        driver.quit();
      });
    });
  });
});