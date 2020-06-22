/* eslint prefer-promise-reject-errors: 0 */

const execFile = require('child_process').execFile
const path = require('path')
const { remote } = require('electron')

/**
 * Decodes a UInt8Array as a String
 * @param {UInt8Array} uint8array ex: output of a bash command
 * @return {string} message
 */
const decode = uint8array => {
  try {
    return new TextDecoder('utf-8').decode(uint8array)
  } catch (err) {
    return uint8array
  }
}

export default {
  /**
   * Executes an executable bash script asynchronously in the `scripts` directory inside a promise,
   * Decodes and log the output if necessary
   * @param {string} scriptName name of the file
   * @param {array<string>} opts arguments of the command
   * @param {object} config configuration
   * @param {boolean} log should log output in console
   * @return {string} output
   */
  execFile (scriptName, opts = [], config = {}, log = true) {
    return new Promise((resolve, reject) => {
      execFile(path.join(remote.app.getAppPath(), `scripts/${scriptName}.sh`), opts, config, (error, stdout, stderr) => {
        const decodedStdOut = decode(stdout)
        const decodedStdErr = decode(stderr)
        if (log && decodedStdOut) console.info(decodedStdOut)
        if (error) {
          if (log && decodedStdErr) console.warn(decodedStdErr)
          return reject({ error, stderr: decodedStdErr, sdtout: decodedStdOut })
        }
        return resolve()
      })
    })
  }
}
