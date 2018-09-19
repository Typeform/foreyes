const path = require('path')

const screenshotsFolder = './screenshots'
const getBaseName = ({ test, meta }) => `${test.title}_${meta.viewport.width}x${meta.viewport.height}`
const getPath = (context, suffix) => path.resolve(screenshotsFolder, `${getBaseName(context)}${suffix}.png`)

exports.baseline = context => getPath(context, '')
exports.actual = (context, browser) => getPath(context, `_actual_${browser}`)
exports.diff = (context, browser) => getPath(context, `_difference_with_${browser}`)
