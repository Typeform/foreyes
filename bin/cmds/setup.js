exports.command = 'setup'
exports.desc =
  'Copies necessary config files into your root, under kattConfig folder'
exports.builder = {}
exports.handler = () => {
  const path = require('path')
  const fs = require('fs')
  const packagePath = path.resolve(__dirname, '..', '..')
  const configFolderName = 'kattConfig'

  if (!fs.existsSync(configFolderName)) {
    fs.mkdirSync(configFolderName)
  }

  const decoratorPath = path.resolve(configFolderName, 'decorator.js')
  if (!fs.existsSync(decoratorPath)) {
    fs.copyFileSync(
      path.resolve(packagePath, 'decorator.dist.js'),
      decoratorPath
    )
  }

  require('ncp').ncp(
    path.resolve(packagePath, '.storybook/'),
    path.resolve(configFolderName, '.storybook/')
  )

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
        description: 'Where will your KATT examples be?',
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
      'katt.config.js',
      `module.exports=${JSON.stringify(result, null, ' ')}`
    )
  })
}
