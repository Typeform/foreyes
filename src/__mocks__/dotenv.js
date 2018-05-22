const dotenv = jest.genMockFromModule('dotenv')

dotenv.config = (input) => {
  process.env.PATH_TO_COMPONENTS = './../src/'
  process.env.PATH_TO_EXAMPLES = './../test/'
  process.env.COMPONENT_FOLDER_BLACKLIST = '__mocks__,css'
}

module.exports = dotenv
