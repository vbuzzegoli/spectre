module.exports = {
  isMac () {
    return process.platform === 'darwin'
  },
  get () {
    return process.platform
  }
}
