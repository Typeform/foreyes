const path = require('path')
const generateCombinationsFor = require(path.resolve(
  __dirname,
  './generateCombinationsFor'
))

jest.mock('fs')
jest.mock('../../foreyesConfig/foreyes.config.js')
const fs = require('fs')

describe('generateCombinationsFor', () => {
  describe('given a component name', () => {
    it('creates a combinations file', () => {
      const raw = require('../__fixtures__/reactComponentFullyAutomatable')
      fs.__setMockFile(raw)

      const expected = `exports.default = {
    "enabled": [
        true,
        false
    ],
    "colorScheme": [
        "1",
        "2",
        "3"
    ]
}`

      const result = generateCombinationsFor('input')
      expect(!result).toBe(true)
      expect(fs.__writtenContent).toBe(expected)
    })

    it("doesn't overwrite the combinations file", () => {
      fs.__fileExists = true
      const result = generateCombinationsFor('button')
      expect(result).toEqual(
        `File for button already exists and would be overwritten`
      )
      expect(fs.__writtenContent).toBeUndefined()
    })

    it("notifies if some combinations couldn't be generated automatically", () => {
      const raw = require('../__fixtures__/reactComponent')
      fs.__setMockFile(raw)
      const result = generateCombinationsFor('input')
      expect(!result).toBe(true)
    })
  })

  afterEach(() => {
    fs.__fileExists = false
    fs.__writtenContent = undefined
  })
})
