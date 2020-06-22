import firebase from '../services/firebase'

const { database } = firebase
const version = require('../../../package.json').version

export default {
  /**
   * Logs an exception in the remote database
   * @param {object} config
   * @param {string} config.step
   * @param {object} config.error
   */
  async logException ({ step, exception }) {
    try {
      const docRef = await database.collection('Exceptions').add({
        version,
        timestamp: new Date().getTime(),
        ...(step ? { step } : {}),
        ...(exception ? { exception: { ...exception, error: { ...exception.error } } } : {}) // clone error instance into agnostic object
      })
      console.info('[API] Anonymous exception successfully logged. Document ID: ', docRef.id)
    } catch (err) {
      console.warn('[API] Could not log exception.', err)
    }
  },

  /**
   * Logs a success
   * @param {object} config
   * @param {string} config.appName
   */
  async logSuccess ({ appName }) {
    try {
      const docRef = await database.collection('Successes').add({
        version,
        timestamp: new Date().getTime(),
        ...(appName ? { appName } : {})
      })
      console.info('[API] Anonymous success successfully logged. Document ID: ', docRef.id)
    } catch (err) {
      console.warn('[API] Could not log success.', err)
    }
  }
}
