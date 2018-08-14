const path = require('path')
jest.mock('../../katt.config.js')

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
    process.env.KATT_URLS = JSON.stringify([
      'https://admin.typeform.com/login/',
      'https://username1.typeform.com/to/abcdef'
    ])
    it('generates a list of urls', () => {
      const result = require(path.resolve(
        __dirname,
        './getComparisonUrls'
      ))
      const expected = [
        'https://admin.typeform.com/login/',
        'https://username1.typeform.com/to/abcdef',
        'http://localhost:1234/iframe.html?full=1&selectedStory=default&selectedKind=button',
        'http://localhost:1234/iframe.html?full=1&selectedStory=custom&selectedKind=split'
      ]
      expect(result).toEqual(expected)
    })
  })
})
