exports.command = 'run-server'
exports.desc = 'Serve example pages'
exports.builder = {}
exports.handler = () => {
  const { writeFileSync } = require('fs')
  const path = require('path')
  const localPath = path.join(__dirname, '..', '..')
  const { configFilePath } = require(path.join(localPath, 'constants.js'))
  const { serverPort } = require(configFilePath)

  const componentList = require(path.join(
    localPath,
    'src/examples/getComponentList'
  ))
  const allExamplePages = require(path.join(
    localPath,
    'src/examples/getAllExamplePages'
  ))
  const customExamplePages = require(path.join(
    localPath,
    'src/examples/getCustomExamplePages'
  ))
  const componentPaths = componentList()
  writeFileSync(
    path.join('foreyesConfig', '.storybook/componentsWithExamplePages.js'),
    allExamplePages(componentPaths),
    { flag: 'w' }
  )
  writeFileSync(
    path.join(
      'foreyesConfig',
      '.storybook/componentsWithCustomExamplePages.js'
    ),
    customExamplePages(componentPaths),
    { flag: 'w' }
  )

  require('child_process').execSync(
    `yarn start-storybook -p ${serverPort} -c foreyesConfig/.storybook`,
    { stdio: [0, 1, 2] }
  )
}
