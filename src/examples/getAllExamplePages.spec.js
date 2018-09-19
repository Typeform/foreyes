const path = require('path')
const getAllExamplePages = require(path.resolve(
  __dirname,
  './getAllExamplePages'
))

jest.mock('fs')
jest.mock('../../foreyesConfig/foreyes.config')
describe('getAllExamplePages', () => {
  describe("given a path to the components' folder", () => {
    it('returns a js-readable list of component paths and combination paths', () => {
      const input = require('../__fixtures__/exampleList')
      require('fs').__fileExists = true
      const output = getAllExamplePages(input)
      const expected = `const examples = {
button: { component: require('../../src/button').default, combinations: require('../../test/button.exampleCombinations.js').default },
input: { component: require('../../src/input').default, combinations: require('../../test/input.exampleCombinations.js').default },
headline: { component: require('../../src/headline').default, combinations: require('../../test/headline.exampleCombinations.js').default },
label: { component: require('../../src/label').default, combinations: require('../../test/label.exampleCombinations.js').default }
};
export default examples;`
      expect(output.replace(/ |\t/g, '')).toMatch(expected.replace(/ |\t/g, ''))
    })
  })
})
