module.exports = {
  preventTitleOverride (w) {
    w.on('page-title-updated', e => {
      e.preventDefault()
    })
  }
}
