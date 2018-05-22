var fs = require('fs')

var jar = require('selenium-server-standalone-jar')
console.log(jar.path)
console.log(jar.version)

var webdriver = require('selenium-webdriver'),
  SeleniumServer = require('selenium-webdriver/remote').SeleniumServer

var server = new SeleniumServer(jar.path, {
  port: 4444
})

server.start()

var driver = new webdriver.Builder()
  .usingServer(server.address())
  //    withCapabilities(webdriver.Capabilities.firefox()).
  .withCapabilities(webdriver.Capabilities.phantomjs())
  .build()

driver.get('http://twitter.com')

driver.takeScreenshot().then((base64Image) => {
  var decodedImage = new Buffer(base64Image, 'base64')
  fs.writeFile('image_decoded.jpg', decodedImage, function (err) {})
  console.log('took screenshot')
})

driver.quit()
