const environment = require('../../utils/environment')

const devTools = {
  setup () {
    // Install `electron-debug` with `devtron`
    require('electron-debug')({ showDevTools: true })

    // Install `vue-devtools`
    require('electron').app.on('ready', () => {
      const installExtension = require('electron-devtools-installer')
      installExtension.default(installExtension.VUEJS_DEVTOOLS)
        .then(() => {})
        .catch(err => {
          console.log('Unable to install `vue-devtools`: \n', err)
        })
    })
  },
  open (w) {
    w.webContents.openDevTools()
  },
  disable (w) {
    w.webContents.on('devtools-opened', w.webContents.closeDevTools)
  }
}

module.exports = {
  initialize (w) {
    if (environment.isDev()) {
      devTools.setup()
      devTools.open(w)
    } else {
      devTools.disable(w)
    }
  }
}
