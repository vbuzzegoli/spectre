const appSection = require('./app')
const fileSection = require('./file')
const platform = require('../../../utils/platform')

module.exports = [
  ...(platform.isMac() ? [ appSection ] : []),
  fileSection
]
