exports.command = 'test'
exports.desc = 'Test Chrome against Firefox and ie11'
exports.builder = {
  component: {
    default: undefined
  },
  isTemplate: {
    default: false,
    description: 'Do you want to test a custom example?'
  },
  urls: {
    default: undefined,
    description:
      'Do you instead want to test specific URLs? Separated by comma.'
  }
}
exports.handler = ({ component, isTemplate, urls }) => {
  if (!component && !urls) {
    console.log('Either use the component parameter or the urls component')
    process.exit(1)
  }
  const path = require('path')

  const components = component
    ? [
      {
        componentName: component,
        type: isTemplate ? 'custom' : 'default'
      }
    ]
    : []
  const url = urls ? urls.split(',') : []

  require(path.resolve(__dirname, 'support', 'runWdio.js'))(components, url)
}
