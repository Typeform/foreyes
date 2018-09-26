const path = require('path')
const { configFilePath } = require(path.join(__dirname, '..', '..', 'constants.js'))
const getBaseName = ({ test, meta }) => `${test.title}_${meta.viewport.width}x${meta.viewport.height}`
const getPath = (context, suffix) => path.join(exports.screenshotsFolder, `${getBaseName(context)}${suffix}.png`)

exports.referenceSuffix = '_actual_'
exports.differenceSuffix = '_difference_with_'
exports.screenshotsFolder = require(configFilePath).screenshotsFolder
exports.baseline = context => getPath(context, '')
exports.actual = (context, browser) => getPath(context, `${exports.referenceSuffix}${browser}`)
exports.diff = (context, browser) => getPath(context, `${exports.differenceSuffix}${browser}`)
