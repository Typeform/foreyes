const path = require('path')
const getComponentFromStdin = require(path.resolve(__dirname, '../src/getComponentFromStdin'))
const componentName = getComponentFromStdin()

const { execSync } = require('child_process')

const baseline_result = execSync(`COMPONENT_NAME=${componentName} wdio wdio.reference.conf.js --spec src/comparison/runBaseline.js`);
const comparison_result = execSync(`COMPONENT_NAME=${componentName} wdio wdio.compare.conf.js --spec src/comparison/runComparison.js`);