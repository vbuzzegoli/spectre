const app = require('./app')
const lifecycle = require('./lifecycle')

module.exports = {
  start (url) {
    lifecycle.start(app.launch.bind(null, url))
  }
}
