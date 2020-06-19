const { BrowserWindow } = require('electron')
// const file = require('../../services/file')
// const menu = require('../menu')
const devTools = require('../devTools')
const frame = require('../frame')
const META = require('../../constants/meta')
const environment = require('../../utils/environment')

module.exports = {
  launch (url) {
    // Create the browser window
    const w = new BrowserWindow({
      title: META.APP_NAME,
      icon: META.APP_ICON,
      width: META.APP_SIZE.WIDTH,
      height: META.APP_SIZE.HEIGHT,
      center: true,
      frame: false,
      useContentSize: true,
      resizable: environment.isDev(),
      fullscreen: false // must be last

      // webPreferences: {
      //   preload: file.getPathFromRoot('src/preload.js')
      // }
    })

    // Initialize menu
    // FIXME: investigate babel transpiling error (known issue)
    // menu.initialize()

    // Initialize dev tools
    devTools.initialize(w)

    // Fix page title
    frame.preventTitleOverride(w)

    // Load URL
    w.loadURL(url)
  }
}
