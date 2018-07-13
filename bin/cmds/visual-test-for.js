exports.command = 'visual-test-for'
exports.desc = 'Test Chrome against Firefox'
exports.builder = {
  component: {
    default: undefined
  }
}
exports.handler = ({ component }) => {
  const { execSync } = require('child_process')
  const localPath = `${__dirname}/../..`
  const path = require('path')
  execSync(
    `COMPONENT_NAME=${component} wdio ${path.resolve(
      localPath,
      'wdio.reference.conf.js'
    )} --spec ${path.resolve(localPath, 'src/comparison/runBaseline.js')}`
  )
  execSync(
    `COMPONENT_NAME=${component} wdio ${path.resolve(
      localPath,
      'wdio.compare.conf.js'
    )} --spec ${path.resolve(localPath, 'src/comparison/runComparison.js')}`
  )
}
