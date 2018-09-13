const path = require('path')
jest.mock('../../foreyes.config.js')

describe('generateAllCombinations', () => {
  describe('Given components and urls', () => {
    process.env.COMPONENTS = JSON.stringify([
      {
        componentName: 'button',
        type: 'default'
      },
      {
        componentName: 'split',
        type: 'custom'
      }
    ])
    process.env.FOREYES_URLS = JSON.stringify([
      'https://admin.typeform.com/login/',
      'https://username1.typeform.com/to/abcdef'
    ])
    it('generates a list of urls', () => {
      const result = require(path.resolve(
        __dirname,
        './getComparisonUrls'
      ))
      const expected = [
        {name: 'admin.typeform.com/login/', url:'https://admin.typeform.com/login/'},
        {name: 'username1.typeform.com/to/abcdef', url:'https://username1.typeform.com/to/abcdef'},
        {name: 'button', url:'http://localhost:1234/iframe.html?full=1&selectedStory=default&selectedKind=button'},
        {name: 'split', url:'http://localhost:1234/iframe.html?full=1&selectedStory=custom&selectedKind=split'},
      ]
      expect(result).toEqual(expected)
    })
  })
})
