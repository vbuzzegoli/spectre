const file = require('../services/file')

module.exports = {
  APP_NAME: 'Spectre',
  APP_SIZE: {
    HEIGHT: 640,
    WIDTH: 470
  },
  APP_ICON: file.getPathFromRoot('assets/icons/png/spectre-xlow-res.png'),
  REPOSITORY_URL: 'https://github.com/vbuzzegoli/spectre'
}
