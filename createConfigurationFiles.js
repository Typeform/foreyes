const file = require('fs')
const path = require('path')
require('dotenv').config({ path: 'katt.config' })

const componentList = () => {
  const blacklist = process.env.COMPONENT_FOLDER_BLACKLIST.split(',')
  const isntBlacklisted = dir => !blacklist.includes(path.basename(dir))
  const isFolder = path => file.lstatSync(path).isDirectory()

  return file
    .readdirSync(process.env.PATH_TO_COMPONENTS)
    .map(name => `${process.env.PATH_TO_COMPONENTS}${name}`)
    .filter(isFolder)
    .filter(isntBlacklisted)
}

const visualExamplePages = (components, variableName) => {
  const examples = components.reduce((acc, directory) => {
    const componentName = path.basename(directory)
    if (
      file.existsSync(`${directory}/${componentName}.exampleCombinations.js`)
    ) {
      acc.push(`'${componentName}'`)
    }
    return acc
  }, [])
  return `const examples = [${examples}]`
}

const allExamplePages = components => {
  const examples = components.reduce((acc, directory) => {
    const componentName = path.basename(directory)
    if (
      file.existsSync(`${directory}/${componentName}.exampleCombinations.js`)
    ) {
      acc.push(
        `\n\t${componentName.replace(
          /-/g,
          '_'
        )}: { component: require('../${directory}').default, combinations: require('../${directory}/${componentName}.exampleCombinations.js').default }`
      )
    } else {
      console.log(`No exampleCombinations file for ${componentName}`)
    }
    return acc
  }, [])

  return `const examples = {${examples}\n}; \nexport default examples;`
}

const components = componentList()
file.writeFileSync(
  'pages_server/componentsWithExamplePages.js',
  allExamplePages(components),
  { flag: 'w' }
)
file.writeFileSync(
  'test_scripts/componentsWithVisualTest.js',
  visualExamplePages(components),
  { flag: 'w' }
)
