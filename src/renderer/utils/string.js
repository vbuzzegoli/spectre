export default {
  /**
   * Sanitizes a strings by trimming it and replacing its spaces
   * @param {string} message string to sanitize
   * @param {string} replaceSpaces replace spaces by
   * @return {string} sanitized message
   */
  sanitize (message, replaceSpaces = '') {
    if (typeof message !== 'string') return message
    return message.trim().replace(' ', replaceSpaces)
  }
}
