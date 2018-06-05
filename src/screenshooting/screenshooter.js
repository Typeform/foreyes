const getUrl = require('./getUrl')
const webdriverio = require('webdriverio');
const webdriverioScreenshot = require('wdio-screenshot');

module.exports = (componentName, browserName) => {
    const url = getUrl(componentName)
    const savePath = `./screenshots/${componentName}_${browserName}.png`

    const options = {
        desiredCapabilities: {
            browserName: browserName
        },
    };

    const client = webdriverio.remote(options)
    webdriverioScreenshot.init(client);


    return client
        .init()
        .url(url)
        .saveDocumentScreenshot(savePath)
        .end()
        .catch(err => console.log(err))
/*         .setViewportSize({
            width: 500,
            height: 500
        })
        .saveScreenshot(savePath) */
}