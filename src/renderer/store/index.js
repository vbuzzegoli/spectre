
import Vue from 'vue'
import Vuex from 'vuex'
import string from '../utils/string'
import interval from '../utils/interval'
import script from '../utils/script'
import * as types from './mutations'
import { createPersistedState } from 'vuex-electron'
import api from '../api'

Vue.use(Vuex)

const defaultState = () => ({
  status: '',
  warn: false,
  processing: false
})

const state = defaultState()

const getters = {}

const actions = {
  /**
   * Temporarily logs a status on the page
   * @param {string} status message to display
   * @param {boolean} warning whether the message should be highlighted as a warning
   */
  temporaryLog ({ commit }, { status, warn = false }) {
    commit(types.SET_STATUS, { status, warn })
    interval.nonRepeating(() => {
      commit(types.SET_STATUS, { status: '', warn: false })
    }, 3000)
  },

  /**
   * Routine when a script fails upon submission
   * @param {object} payload error information
   * @param {string} payload.step step at which it failed
   * @param {string} payload.exception exception containing the error and the decode output streams
   */
  scriptFailed ({ dispatch, commit }, { step, exception }) {
    // Log to remote (fire and forget)
    api.logException({ step, exception: { ...exception, error: { ...exception.error } } }) // clone error instance into agnostic object
    // Update UX
    dispatch('temporaryLog', { message: 'Something went wrong', warn: true })
    commit(types.SET_PROCESSING, false)
  },

  /**
   * Creates an application asynchronously by leveraging the Spectre Engine
   * @param {object} payload configuration
   * @param {string} payload.name name of the application
   * @param {string} payload.url url of the application
   * @param {boolean} payload.useLocalIcon use a local icon as the application icon
   * @param {string} payload.icon path/url of the icon
   * @param {boolean} payload.fullscreen launch in fullscreen
   * @param {string} payload.width width
   * @param {string} payload.height height
   * @param {boolean} payload.frameless frameless mode
   */
  async createApplication ({ commit, dispatch, state }, { name, url, useLocalIcon, icon, fullscreen, width, height, frameless }) {
    if (state.processing) { return }

    console.info('Initiating Sequence..')
    commit(types.SET_PROCESSING, true)

    // Create Configuration
    const configuration = {
      title: string.sanitize(name, '-'),
      url: string.sanitize(url),
      ...(useLocalIcon ? { imagePath: string.sanitize(icon) } : { imageUrl: string.sanitize(icon) }),
      fullscreen: fullscreen,
      ...(fullscreen ? { width: string.sanitize(width), height: string.sanitize(height) } : {}),
      ghostMode: frameless,
      useApplicationFolder: true
    }

    // Configuring Engine
    commit(types.SET_STATUS, { status: 'Setting up Engine..' })
    try {
      await script.execFile('setupEngine')
    } catch (exception) {
      dispatch('scriptFailed', { step: 'ENGINE_CONFIGURATION', exception })
      return
    }

    // Generating Application
    commit(types.SET_STATUS, { status: 'Generating Application..' })
    try {
      await script.execFile('generateApplication', [ JSON.stringify(configuration) ])
    } catch (exception) {
      dispatch('scriptFailed', { step: 'APPLICATION_CREATION', exception })
      return
    }

    // Log to remote (fire and forget)
    api.logSuccess({ appName: string.sanitize(name, '-') })
    // Update UX
    dispatch('temporaryLog', { message: 'Done!' })
    commit(types.SET_PROCESSING, false)
  }
}

const mutations = {
  [types.SET_STATUS] (state, { status = '', warn = false }) {
    state.status = status
    state.warn = warn
  },

  [types.SET_PROCESSING] (state, payload) {
    state.processing = payload
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
