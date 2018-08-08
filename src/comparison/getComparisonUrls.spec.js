const path = require('path')
jest.mock('../../katt.config.js')

describe('generateAllCombinations', () => {
  describe('Given components and urls', () => {
    process.env.COMPONENTS = JSON.stringify(require(path.resolve(__dirname,'__fixtures__/componentsList')))
    process.env.KATT_URLS = JSON.stringify(require(path.resolve(__dirname,'__fixtures__/urlsList')))
    it('generates a list of urls', () => {
      const result = require(path.resolve(
        __dirname,
        './getComparisonUrls'
      ))
      const expected = require(path.resolve(__dirname,'__fixtures__/comparisonUrlsList'))
      expect(result).toEqual(expected)
    })
  })
})
