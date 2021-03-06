const fs = jest.genMockFromModule('fs')

let mockFile = ''

fs.__setMockFile = newMockFile => {
  mockFile = newMockFile
}
fs.readFileSync = directoryPath => {
  if(directoryPath.includes('config.json')){
    return `{
      "pathToComponents": "src/",
      "pathToExamples": "test/",
      "componentFolderBlacklist": ["__mocks__", "css"],
      "serverPort": 1234
    }`
  }
  return mockFile
}
fs.__setFileNotFound = () => {
  fs.readFileSync = () => {
    throw new Error('Exception')
  }
}
fs.existsSync = () => fs.__fileExists === true

fs.writeFileSync = (path, content) => {
  fs.__writtenContent = content
}
fs.readdirSync = () => require('../__fixtures__/componentList')
fs.lstatSync = name => ({ isDirectory: () => !name.includes('file') })

module.exports = fs
