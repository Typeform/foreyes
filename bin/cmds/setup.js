const path = require('path')
const localPath = path.join(__dirname, '..', '..')
const { configFolder, configFilePath } = require(path.join(
  localPath,
  'constants.js'
))
const fs = require('fs')

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

exports.command = 'setup'
exports.desc =
  'Copies necessary config files into your root, under foreyesConfig folder'
exports.builder = {}
exports.handler = () => {
  const reportPath = path.join(configFolder, 'report')
  const storyBookPath = path.join(configFolder, '.storybook')
  const storybookConfigFile = path.join(storyBookPath, 'config.js')
  const copyDirSync = require('copy-dir').sync

  makeDirectory(configFolder)
  copyFile(
    path.join(localPath, 'decorator.dist.js'),
    path.join(configFolder, 'decorator.js')
  )
  copyFile(
    path.join(localPath, 'fixtureUrls.dist.json'),
    path.join(configFolder, 'fixtureUrls.json')
  )

  makeDirectory(storyBookPath)
  copyFile(
    path.join(localPath, '.storybook', '.babelrc'),
    path.join(storyBookPath, '.babelrc')
  )
  copyFile(
    path.join(localPath, '.storybook', 'webpack.config.js'),
    path.join(storyBookPath, 'webpack.config.js')
  )
  if (!fs.existsSync(storybookConfigFile)) {
    fs.writeFileSync(
      storybookConfigFile,
      `import examples from './componentsWithExamplePages'
import customExamples from './componentsWithCustomExamplePages'
import '../decorator'
import configure from '${storybookConfigFile}'
configure(examples, customExamples)`
    )
  }

  makeDirectory(reportPath)
  copyDirSync(path.join(localPath, 'report', 'dist'), reportPath)

  promptSetup()
}

const promptSetup = () => {
  const prompt = require('prompt')
  prompt.message = ''
  prompt.delimiter = ''
  const isDesignSystem = () => prompt.history('isDesignSystem').value
  prompt.start()

  const schema = {
    properties: {
      browsers: {
        description: 'Browsers to test (chrome is always baseline)',
        default: 'firefox,ie11',
        before: browsers => {
          const supportedBrowsers = ['firefox', 'ie11']
          return browsers
            .trim()
            .toLowerCase()
            .split(',')
            .filter(browser => {
              if (supportedBrowsers.includes(browser)) {
                return true
              } else {
                console.log(`Unknown/Unsupported browser ${browser}`)
                return false
              }
            })
        }
      },
      viewports: {
        description: 'All screen sizes to test: 1024,600;1280,720.',
        default: '1024,600',
        before: viewports => {
          return viewports
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
        }
      },
      screenshotsFolder: {
        description: 'Directory where screenshots will be saved',
        default: './screenshots'
      },
      ignoreComparison: {
        description:
          'What details to ignore from: nothing, colors, antialiasing',
        default: 'antialiasing',
        pattern: /^nothing|colors|antialiasing$/
      },
      misMatchTolerance: {
        description: 'What % of difference do we allow between browsers',
        default: 2,
        type: 'number'
      },
      isDesignSystem: {
        description: 'Are you configuring foreyes for a design system?',
        type: 'boolean',
        default: false
      },
      pathToComponents: {
        description: 'Where are your components?',
        default: 'src/components/',
        ask: isDesignSystem
      },
      pathToExamples: {
        description: 'Where will your Foreyes examples be?',
        default: 'tests/',
        ask: isDesignSystem
      },
      componentFolderBlacklist: {
        description:
          'Are there any folders there that are not components? (separate by comma)',
        default: '',
        ask: isDesignSystem,
        before: blacklist => blacklist.trim().split(',')
      },
      serverPort: {
        description: 'Port in which the example pages will be mounted',
        type: 'number',
        default: '8080',
        ask: isDesignSystem
      }
    }
  }

  prompt.get(schema, function (err, result) {
    if (err) {
      return err
    }

    fs.writeFileSync(configFilePath, JSON.stringify(result, null, 4))
  })
}
