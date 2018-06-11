module.exports = (propType) => {
  const types = [
    { name: 'boolean', matches: propType => propType === 'bool', getCombination: () => [true, false] },
    {
      name: 'oneOf',
      matches: propType => propType.indexOf('oneOf(') !== -1,
      getCombination: propType => {
        return propType
          .substring(propType.indexOf('[') + 1, propType.indexOf(']'))
          .replace(/"|'/g, '')
          .split(',')
      }
    },
    { name: 'default', matches: propType => true, getCombination: () => [] }
  ]

  for (let i in types) {
    if (types[i].matches(propType)) {
      return types[i].getCombination(propType)
    }
  }
}
