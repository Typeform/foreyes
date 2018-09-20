module.exports = () => {
  const { screenshotsFolder, referenceSuffix, differenceSuffix } = require('./screenshotName')
  const { readdirSync,  writeFileSync } = require('fs')
  const path = require('path').resolve

  const testCases = readdirSync(screenshotsFolder)
  const report = testCases.reduce((acc1, testCase) => {
    const screenshots = readdirSync(path(screenshotsFolder, testCase))
    
    acc1[testCase] = screenshots.reduce((acc2, screenshotName) => {
      const fullPath = path(screenshotsFolder, testCase, screenshotName)
      const screenshotData = screenshotName.substring(1).split('.')[0].split('_')
      const viewport = screenshotData[0]
      acc2[viewport] = acc2[viewport] || {}

      if(screenshotData.length == 1){
        acc2[viewport].baseline = fullPath
        return acc2        
      }

      const browser = screenshotData[screenshotData.length-1]
      acc2[viewport][browser] = acc2[viewport][browser] || { failed: false }
      if(screenshotName.includes(referenceSuffix)){
        acc2[viewport][browser].reference = fullPath
      } else if(screenshotName.includes(differenceSuffix)){
        acc2[viewport][browser].difference = fullPath
        acc2[viewport][browser].failed = true
      }
      
      return acc2
    }, {})
    return acc1
  }, {})

  writeFileSync(path('foreyesConfig', 'report', 'report.js'), `const report = ${JSON.stringify(report,undefined,2)}`)
}