const component = "button"//require('../examples/getComponentFromStdin')()
const referenceBrowser = "chrome" //TODO: get from wdio.reference.conf.js
describe("blabla", () =>{
it('blandiblu', function () {
    console.log(`Saving baseline for ${component} on ${browser.desiredCapabilities.browserName}`)
    const report = browser
        .url(`/iframe.html?full=1&selectedStory=default&selectedKind=${component}`)
        .checkDocument()
});
})