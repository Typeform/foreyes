const path = require('path')
const getComponentList = require(path.join(__dirname, './getComponentList'))

jest.mock('fs')

describe('getComponentList', () => {
  it('returns all non-blacklisted subfolders', () => {
    const expected = ['button', 'input', 'headline', 'label']
    expect(getComponentList()).toEqual(expected)
  })
})
