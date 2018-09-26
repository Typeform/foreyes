const path = require('path')
const generateAllCombinations = require(path.join(
  __dirname,
  './generateAllCombinations'
))

jest.mock('fs')
jest.mock('../../foreyesConfig/foreyes.config.js')

describe('generateAllCombinations', () => {
  it('generates one file per component', () => {
    const filesCreated = generateAllCombinations().reduce((acc, result) => {
      if (!result.result) acc++
      return acc
    }, 0)
    expect(filesCreated).toBe(4)
  })
})
