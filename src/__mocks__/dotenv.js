const dotenv = jest.genMockFromModule('dotenv')

dotenv.config = (input) => {
  process.env.PATH_TO_COMPONENTS = './../src'
  process.env.COMPONENT_FOLDER_BLACKLIST = '__mocks__,css'
}

module.exports = dotenv
