const path = require('path')
const fs = require('fs')
const { configFilePath } = require(path.join(
  '..', '..',
  'constants.js'
))
const { screenshotsFolder } = JSON.parse(fs.readFileSync(configFilePath))

const getBaseName = ({ test, meta }) => `${test.title}_${meta.viewport.width}x${meta.viewport.height}`
const getPath = (context, suffix) => path.join(exports.screenshotsFolder, `${getBaseName(context)}${suffix}.png`)

exports.referenceSuffix = '_actual_'
exports.differenceSuffix = '_difference_with_'
exports.screenshotsFolder = screenshotsFolder
exports.baseline = context => getPath(context, '')
exports.actual = (context, browser) => getPath(context, `${exports.referenceSuffix}${browser}`)
exports.diff = (context, browser) => getPath(context, `${exports.differenceSuffix}${browser}`)
