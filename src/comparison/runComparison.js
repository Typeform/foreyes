var assert = require('assert');

const component = "button" //TODO: get from STDIN
const referenceBrowser = "chrome" //TODO: get from wdio.reference.conf.js
describe('Save comparison', function () {
    it('should take a reference screenshot', function () {

        const report = browser
            .url(`/iframe.html?full=1&selectedStory=default&selectedKind=${component}`)
            .checkDocument()

        report.forEach((result) => {
            assert.ok(
                result.isWithinMisMatchTolerance,
                `Difference against ${referenceBrowser} (master) is too big (${result.misMatchPercentage}% mismatch)`
            )
        })
    });
});