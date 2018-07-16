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
  fs.copyFileSync(
    path.resolve(packagePath, 'decorator.dist.js'),
    path.resolve(configFolderName, 'decorator.js')
  )
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
        default: 2
      },
      ignoreComparison: {
        description:
          'Choose what details to ignore from: nothing, colors, antialiasing',
        default: 'antialiasing',
        pattern: /^nothing|colors|antialiasing$/
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
    require('fs').writeFileSync(
      'katt.config.js',
      `module.exports=${JSON.stringify(result, null, ' ')}`
    )
  })
}
