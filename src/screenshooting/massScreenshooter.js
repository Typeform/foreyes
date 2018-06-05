const screenshooter = require('./screenshooter')
const getComponent = require('../examples/getComponentFromStdin')

const component = getComponent();
const supportedBrowser = ['chrome', 'firefox']
supportedBrowser.forEach((browser) => screenshooter(component, browser))

