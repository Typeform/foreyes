const path = require('path')
const getAttributeCombinationsFromArray = require(path.resolve(__dirname, './getAttributeCombinationsFromArray'))

describe('getAttributeCombinationsFromArray', () => {
  it('parses a boolean', () => {
    const combinations = getAttributeCombinationsFromArray('bool')
    expect(combinations).toEqual([true, false])
  })

  it('parses oneOf', () => {
    const sizes = ['large', 'medium', 'small']
    const combinations = getAttributeCombinationsFromArray(`oneOf(${JSON.stringify(sizes)})`)
    expect(combinations).toEqual(sizes)
  })

  it('ignores string quotes on oneOf', () => {
    const sizes = ['large', 'medium', 'small']
    const combinations = getAttributeCombinationsFromArray(`oneOf(${JSON.stringify(sizes)})`)
    expect(combinations).toEqual(sizes)
  })

  it('parses an unknown propType as []', () => {
    const combinations = getAttributeCombinationsFromArray(`func`)
    expect(combinations).toEqual([])
  })
})
