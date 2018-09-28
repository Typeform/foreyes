module.exports = propType => {
  const types = [
    {
      name: 'boolean',
      matches: propType => propType === 'bool',
      getCombination: () => [true, false]
    },
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
    { name: 'default', matches: () => true, getCombination: () => [] }
  ]

  return types.find(type => type.matches(propType)).getCombination(propType)
}
