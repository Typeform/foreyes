var Launcher = require('webdriverio').Launcher;
var wdio = new Launcher('./src/screenshooting/wdio.conf.js');
wdio.run().then(function (code) {
}, function (error) {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
});

    /* browser = webdriverio.remote(options).init().url(url)
    const img = screenshoot(browser).then((img) => {
        console.log(img)
        fs.writeFile(`./screenshots/taken/${componentName}.png`, img, function(err) {
            console.log(err);
        });
        browser.end()
        return imagePath;
    }, (err) => {console.log(err)})
*/