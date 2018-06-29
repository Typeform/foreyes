exports.command = 'generate-combinations-for'
exports.desc = 'Create a base example file.'
exports.builder = {
  component: {
    default: undefined
  }
}
exports.handler = ({ component }) => {
  const { execSync } = require('child_process')

  execSync(`COMPONENT_NAME=${component} wdio wdio.reference.conf.js --spec src/comparison/runBaseline.js`)
  execSync(`COMPONENT_NAME=${component} wdio wdio.compare.conf.js --spec src/comparison/runComparison.js`)
}
