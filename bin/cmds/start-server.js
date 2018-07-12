exports.command = 'start-server'
exports.desc = 'Serve example pages'
exports.builder = {}
exports.handler = () => {
  const localPath = `${__dirname}/../..`
  const file = require('fs')
  const path = require('path')
  const componentList = require(path.resolve(
    localPath,
    'src/examples/getComponentList'
  ))
  const allExamplePages = require(path.resolve(
    localPath,
    'src/examples/getAllExamplePages'
  ))
  const customExamplePages = require(path.resolve(
    localPath,
    'src/examples/getCustomExamplePages'
  ))
  const componentPaths = componentList()
  file.writeFileSync(
    path.resolve('kattConfig', '.storybook/componentsWithExamplePages.js'),
    allExamplePages(componentPaths),
    { flag: 'w' }
  )
  file.writeFileSync(
    path.resolve(
      'kattConfig',
      '.storybook/componentsWithCustomExamplePages.js'
    ),
    customExamplePages(componentPaths),
    { flag: 'w' }
  )

  require('child_process').execSync(
    'yarn start-storybook -p 8080 -c kattConfig/.storybook',
    { stdio: [0, 1, 2] }
  )
}