var assert = require('assert');
const componentName = process.env.COMPONENT_NAME

const referenceBrowser = "chrome" //TODO: get from wdio.reference.conf.js
describe(`${browser.desiredCapabilities.browserName}_`, function () {
    it(componentName, function () {
        const report = browser
            .url(`/iframe.html?full=1&selectedStory=default&selectedKind=${componentName}`)
            .checkDocument()

        report.forEach((result) => {
            if (!result.isWithinMisMatchTolerance) {
                console.error(`Difference against ${referenceBrowser} (master) is too big (${result.misMatchPercentage}% mismatch)`)
                return process.exit(1);
            } else {
                console.log(`Finished image comparison: Pass!.`)
                return process.exit(0);
            }
        })
    });
});