load('browsers.js')
load('devices.js')
load('config.js')
load('componentsWithLayoutTest.js')

forAll(browsers, function () {
  forAll(devices, function () {
    layoutTestableComponents.forEach(function (component) {
      test("Test on " + component, function (browser, device) {
        var pageName = component.replace(/-/g, "_") //replace -s with _s in the name
        var driver = createDriver(config.pagesURI + pageName, device.size, browser.name);
        checkLayout(driver, config.componentsSrcURI + component + "/" + component + ".gspec");
        driver.quit();
      });
    });
  });
});