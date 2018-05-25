const getComponentFromStdin = require('./getComponentFromStdin')

let actualArgvs
describe('getComponentFromStdin', () => {
  beforeEach(() => { actualArgvs = process.argv })

  it('interprets the first CLI parameter as a component name', () => {
    const componentName = 'input'
    process.argv = [0, 0, componentName]
    expect(getComponentFromStdin()).toEqual(componentName)
  })

  it('fails when no CLI parameters are given', () => {
    process.argv = [0, 0]
    expect(() => getComponentFromStdin()).toThrow()
  })

  afterEach(() => { process.argv = actualArgvs })
})
