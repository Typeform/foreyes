jest.mock('./getUrl.js')

const screenshooter = require('./screenshooter')
const fs = require('fs')

jest.setTimeout(100000)

describe('Screenshooting technology', () => {
    describe('given a url', () => {
        const component = 'button'
        it('takes one picture in firefox', async () => {
            return screenshooter(component, 'firefox').then(result => {
                expect(fs.existsSync(`./screenshots/${component}_firefox.png`)).toBe(true);
            })
        })
        it('takes one picture in chrome', () => {
            return screenshooter(component, 'chrome').then(result => {
                expect(fs.existsSync(`./screenshots/${component}_chrome.png`)).toBe(true);
            })
        })
        afterEach(() => {

            return
            fs.unlink(`./screenshots/${component}_firefox.png`, () => {})
            fs.unlink(`./screenshots/${component}_chrome.png`, () => {})
        })
    })
})
