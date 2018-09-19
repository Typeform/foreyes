const path = require('path')
const getCustomExamplePages = require(path.resolve(
  __dirname,
  './getCustomExamplePages'
))

jest.mock('fs')
jest.mock('../../foreyesConfig/foreyes.config')

describe('getCustomExamplePages', () => {
  describe("given a path to the components' folder", () => {
    it('returns a js-readable list of custom pages', () => {
      const input = require('../__fixtures__/customExampleList')
      require('fs').__fileExists = true
      const output = getCustomExamplePages(input)
      const expected = `const examples = {
button: require('../../test/button.customExample.js').default,
input: require('../../test/input.customExample.js').default,
label: require('../../test/label.customExample.js').default
};
export default examples;`
      expect(output.replace(/ |\t/g, '')).toMatch(expected.replace(/ |\t/g, ''))
    })
  })
})
