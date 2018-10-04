exports.command = 'run-server'
exports.desc = 'Serve example pages'
exports.builder = {}
exports.handler = () => {
  const path = require('path')
  const localPath = path.join(__dirname, '..', '..')
  const { writeFileSync, readFileSync } = require('fs')
  const { configFolder, configFilePath } = require(path.join(
    localPath,
    'constants.js'
  ))
  const { serverPort } = JSON.parse(readFileSync(configFilePath))

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
    path.join(configFolder, '.storybook/componentsWithExamplePages.js'),
    allExamplePages(componentPaths),
    { flag: 'w' }
  )
  writeFileSync(
    path.join(configFolder, '.storybook/componentsWithCustomExamplePages.js'),
    customExamplePages(componentPaths),
    { flag: 'w' }
  )

  require('child_process').execSync(
    `yarn start-storybook -p ${serverPort} -c ${configFolder}/.storybook`,
    { stdio: [0, 1, 2] }
  )
}
