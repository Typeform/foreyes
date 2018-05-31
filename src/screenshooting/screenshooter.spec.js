const getUrl = require('./getUrl')
const screenshooter = require('./screenshooter')

describe('Screenshooting technology', () => {
    describe('given 68 components in firefox', () => {
        const times = 1 //put 1 at the beginning in order to test the technology
        const componentList = Array(times).fill('button') //simplified
        const browser = 'firefox'
        it('takes one picture per component page', () => {
             const imagePaths = componentList.map((component) => screenshooter(browser, component))
             //this should create actual diff images, for you to see if they're created properly             
             //imagePaths.forEach((path) => expect(path).not.toBeFalsy())
        })
    })
})
