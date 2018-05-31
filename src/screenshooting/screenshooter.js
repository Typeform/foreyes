const getUrl = require('./getUrl')
const webdriverio = require('webdriverio');
const wdio = require('wdio-screenshot')
const fs = require('fs')
const screenshoot = require('wdio-screenshot').makeViewportScreenshot;
const options = {
    desiredCapabilities: {
        browserName: 'firefox'
    },
    screenshotPath: './screenshots/taken/' //ensure your screenshots are put under here
};

thething = async (componentName,i,max) => {
    if(i == max) return;
    console.log(`${i} until ${max}`)
    const url = getUrl(componentName);
    const savePath = `./screenshots/taken/${componentName}${i}.png`;

    let browser = webdriverio.remote(options).init().url(url)
    const base64Image = await wdio.makeViewportScreenshot(browser);
    fs.writeFile(savePath, base64Image, 'base64', () => thething(componentName,i+1, max))
    browser.end()
    
}
thething('button',0,5)
thething('button',5,10)
thething('button',10,15)
thething('button',15,20)