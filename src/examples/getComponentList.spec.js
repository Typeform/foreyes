const path = require('path')
const getComponentList = require(path.resolve(__dirname, './getComponentList'))

jest.mock('fs')
jest.mock('../../foreyesConfig/foreyes.config.js')

describe('getComponentList', () => {
  it('returns all non-blacklisted subfolders', () => {
    const expected = ['button', 'input', 'headline', 'label']
    expect(getComponentList()).toEqual(expected)
  })
})
