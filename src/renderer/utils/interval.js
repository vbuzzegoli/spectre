export default {
  /**
   * Creates a non-repeating interval that will stop itself after running once
   * @param {function} cb callback function to be ran when the interval is triggered
   * @param {number} time duration of the interval in ms
   */
  nonRepeating (cb, time) {
    const interval = setInterval(async () => {
      clearInterval(interval)
      await cb()
    }, time)
  }
}
