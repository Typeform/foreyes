const path = require('path')
const getPropTypesAsArray = require(path.resolve(__dirname, './getPropTypesAsArray'))

jest.mock('fs')
const fs = require('fs')

describe('getPropTypesAsArray', () => {
  it("lists a component's proptypes in an array", () => {
    const raw = require('../__fixtures__/reactComponent')
    fs.__setMockFile(raw)

    const expected = [{ attribute: 'maxChars', propType: 'bool' },
      { attribute: 'colorScheme', propType: 'oneOf([1,2,3])' },
      { attribute: 'width', propType: 'number' },
      { attribute: 'enabled', propType: 'bool' }]

    expect(getPropTypesAsArray('input', `${__dirname}/`))
      .toEqual(expected)
  })

  it('returns empty if there are no proptypes', () => {
    const raw = 'const nonParsedVar = "This should not be parsed"'
    fs.__setMockFile(raw)

    expect(getPropTypesAsArray('input', `${__dirname}/`)).toEqual([])
  })

  it("throws if there's no such component", () => {
    fs.__setFileNotFound()

    expect(() => getPropTypesAsArray('button', `${__dirname}/`)).toThrow()
  })
})
