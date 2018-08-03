exports.command = 'test'
exports.desc = 'Test Chrome against Firefox and'
exports.builder = {
  component: {
    default: undefined,
    required: true
  },
  isTemplate: {
    default: false,
    description: 'Do you want to test a custom example?'
  }
}
exports.handler = ({ component, isTemplate }) => {
  const path = require('path')

  process.env.COMPONENTS = JSON.stringify([
    {
      componentName: component,
      type: isTemplate ? 'custom' : 'default'
    }
  ])

  require(path.resolve(__dirname, 'support', 'runWdio.js'))()
}
