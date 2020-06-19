const template = require('./template')
const { Menu } = require('electron')

module.exports = {
  initialize () {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
}
