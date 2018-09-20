exports.command = 'setup'
exports.desc =
  'Copies necessary config files into your root, under foreyesConfig folder'
exports.builder = {}
exports.handler = () => {
  const path = require('path').resolve
  const fs = require('fs')
  const packagePath = path(__dirname, '..', '..')
  const destinationConfigPath = 'foreyesConfig'
  const storyBookPath = path('foreyesConfig', '.storybook')
  const reportPath = path('foreyesConfig', 'report')
  const copyDirSync = require('copy-dir').sync

  const copyFile = (from, to) => {
    if (!fs.existsSync(to)) {
      fs.copyFileSync(from, to)
    }
  }
  const makeDirectory = dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  }

  makeDirectory(destinationConfigPath)
  copyFile(
    path(packagePath, 'decorator.dist.js'),
    path(destinationConfigPath, 'decorator.js')
  )
  copyFile(
    path(packagePath, 'fixtureUrls.dist.json'),
    path(destinationConfigPath, 'fixtureUrls.json')
  )

  makeDirectory(storyBookPath)
  copyFile(
    path(packagePath, '.storybook', '.babelrc'),
    path(storyBookPath, '.babelrc')
  )
  copyFile(
    path(packagePath, '.storybook', 'webpack.config.js'),
    path(storyBookPath, 'webpack.config.js')
  )
  const configPath = path(destinationConfigPath, '.storybook/config.js')
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      `import examples from './componentsWithExamplePages'
import customExamples from './componentsWithCustomExamplePages'
import '../decorator'
import configure from '${path(__dirname, '../../', '.storybook/config.js')}'
configure(examples, customExamples)`
    )
  }

  makeDirectory(reportPath)
  copyDirSync(path(packagePath, 'report', 'dist'), reportPath)

  interactiveConfigSetup()
}

const interactiveConfigSetup = () => {
  const prompt = require('prompt')
  prompt.message = ''
  prompt.delimiter = ''
  prompt.start()

  var schema = {
    properties: {
      path_to_components: {
        description: 'Where are your components?',
        default: 'src/components/',
        required: true
      },
      path_to_examples: {
        description: 'Where will your Foreyes examples be?',
        default: 'tests/',
        required: true
      },
      component_folder_blacklist: {
        description:
          'Are there any folders there that are not components? (separate by comma)',
        default: ''
      },
      misMatchTolerance: {
        description:
          'In %, how many pixels of difference do we allow between browsers',
        default: 2,
        type: 'number'
      },
      ignoreComparison: {
        description:
          'Choose what details to ignore from: nothing, colors, antialiasing',
        default: 'antialiasing',
        pattern: /^nothing|colors|antialiasing$/
      },
      viewports: {
        description:
          'One or more screen sizes the browser should take: 1024,600;1280;720.',
        default: '1024,600'
      },
      serverPort: {
        description: 'Port in which the example pages will be mounted',
        default: '8080'
      }
    }
  }

  prompt.get(schema, function (err, result) {
    if (err) {
      return err
    }

    result.component_folder_blacklist = result.component_folder_blacklist
      .trim()
      .split(',')

    result.viewports = result.viewports
      .trim()
      .split(';')
      .map(viewport => {
        const [width, height] = viewport.split(',')
        if (!width || !height) {
          return
        }
        return {
          width: parseInt(width),
          height: parseInt(height)
        }
      })

    require('fs').writeFileSync(
      'foreyes.config.js',
      `module.exports=${JSON.stringify(result, null, ' ')}`
    )
  })
}
