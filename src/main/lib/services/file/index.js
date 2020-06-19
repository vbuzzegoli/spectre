const path = require('path')
const fs = require('fs')
const { app } = require('electron')

module.exports = {
  readJSONAt (filePath) {
    return require(path.join(app.getAppPath(), filePath))
  },
  getPathFromRoot (filePath) {
    return path.join(app.getAppPath(), filePath)
  },
  pathExistsFromRoot (filePath) {
    try {
      fs.statSync(path.join(app.getAppPath(), filePath))
      return true
    } catch (err) {
      return false
    }
  }
}
