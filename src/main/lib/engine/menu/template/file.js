const platform = require('../../../utils/platform')

module.exports = {
  label: 'File',
  submenu: [
    platform.isMac() ? { role: 'close' } : { role: 'quit' }
  ]
}
