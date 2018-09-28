const path = require('path')
const { screenshotsFolder } = require(path.resolve(process.cwd(), 'foreyes.config'))

const getBaseName = ({ test, meta }) => `${test.title}_${meta.viewport.width}x${meta.viewport.height}`
const getPath = (context, suffix) => path.resolve(exports.screenshotsFolder, `${getBaseName(context)}${suffix}.png`)

exports.referenceSuffix = '_actual_'
exports.differenceSuffix = '_difference_with_'
exports.screenshotsFolder = './screenshots'
exports.baseline = context => getPath(context, '')
exports.actual = (context, browser) => getPath(context, `${exports.referenceSuffix}${browser}`)
exports.diff = (context, browser) => getPath(context, `${exports.differenceSuffix}${browser}`)
