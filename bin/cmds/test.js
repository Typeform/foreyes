exports.command = 'test'
exports.desc = 'Test Chrome against Firefox and'
exports.builder = {
  component: {
    default: undefined
  },
  isTemplate: {
    default: false,
    description: 'Do you want to test a custom example?'
  },
  urls: {
    default: [],
    description:
      'Do you instead want to test specific URLs? Separated by comma.'
  }
}
exports.handler = ({ component, isTemplate, urls }) => {
  if (!component && urls.split(',').length < 0) {
    console.log('Either use the component parameter or the urls component')
    process.exit(1)
  }
  const path = require('path')

  process.env.COMPONENTS = JSON.stringify([
    {
      componentName: component,
      type: isTemplate ? 'custom' : 'default'
    }
  ])
  process.env.KATT_URLS = JSON.stringify(urls.split(','))

  require(path.resolve(__dirname, 'support', 'runWdio.js'))()
}
