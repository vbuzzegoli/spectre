const { app, BrowserWindow } = require('electron')
const platform = require('../../utils/platform')
const contextMenu = require('electron-context-menu')

module.exports = {
  start (launch) {
    // Setup context menu support
    contextMenu()

    // Launch when Electron has finished
    // initialization and is ready to create browser windows
    app.on('ready', launch)

    // Quit when all windows are closed
    app.on('window-all-closed', function () {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (platform.isMac()) app.quit()
    })

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open
      if (BrowserWindow.getAllWindows().length === 0) launch()
    })
  }
}
