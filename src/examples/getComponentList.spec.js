const getComponentList = require('./getComponentList')

jest.mock('fs')
jest.mock('../../katt.config.js')

describe('getComponentList', () => {
  it('returns all non-blacklisted subfolders', () => {
    const expected = ['button',
      'input',
      'headline',
      'label']
    expect(getComponentList()).toEqual(expected)
  })
})
