exports.command = 'run-server'
exports.desc = 'Serve example pages'
exports.builder = {}
exports.handler = () => {
  const { writeFileSync } = require('fs')
  const path = require('path').resolve
  const localPath = path(__dirname, '..', '..')
  const { configFilePath } = require(path(localPath, 'constants.js'))
  const { serverPort } = require(configFilePath)

  const componentList = require(path(
    localPath,
    'src/examples/getComponentList'
  ))
  const allExamplePages = require(path(
    localPath,
    'src/examples/getAllExamplePages'
  ))
  const customExamplePages = require(path(
    localPath,
    'src/examples/getCustomExamplePages'
  ))
  const componentPaths = componentList()
  writeFileSync(
    path('foreyesConfig', '.storybook/componentsWithExamplePages.js'),
    allExamplePages(componentPaths),
    { flag: 'w' }
  )
  writeFileSync(
    path('foreyesConfig', '.storybook/componentsWithCustomExamplePages.js'),
    customExamplePages(componentPaths),
    { flag: 'w' }
  )

  require('child_process').execSync(
    `yarn start-storybook -p ${serverPort} -c foreyesConfig/.storybook`,
    { stdio: [0, 1, 2] }
  )
}
