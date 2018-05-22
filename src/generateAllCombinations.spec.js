const generateAllCombinations = require('./generateAllCombinations')

jest.mock('fs')
jest.mock('dotenv')

describe('generateAllCombinations', () => {
  it('generates one file per component', () => {
    const filesCreated = generateAllCombinations()
      .reduce((acc, result) => {
        if (result.result === 0) acc++
        return acc
      }, 0)
    expect(filesCreated).toBe(4)
  })
})
