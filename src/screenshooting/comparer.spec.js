const getUrl = require('./getUrl')
const comparer = require('./comparer')

describe('Comparing technology', () => {
    describe('given 68 images for chrome and also firefox', () => {
        const times = 68 //put 1 at the beginning in order to test the technology
        const masterImage = './screenshots/img1.png' //simplified
        const studentImage = './screenshots/img2.png'
        it('compares images and creates a diff image if different', () => {
             const diffPaths = Array(68).map(() => comparer(masterImage, studentImage))
             //this should create actual diff images, for you to see if they're created properly
             diffPaths.forEach((path) => expect(path).not.toBeFalsy())
        })
    })
})
