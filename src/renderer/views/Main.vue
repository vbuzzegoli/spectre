<template>
  <main>
    <div class="head">
      <img class="main-logo" src="~@/assets/spectre-inv.png" alt="spectre">
      <div class="close-btn-wrapper">
        <button 
          class="close-btn"
          @click="exit">
          <span class="close-btn--x">X</span>
        </button>
      </div>
    </div>
    <div class="content">
      <h2> App Name </h2>
      <input
        v-model="name"
        :disabled="processing"
        placeholder="Example.."/>

      <h2> Web App URL </h2>
      <input
        v-model="url"
        :disabled="processing"
        placeholder="https://..."/>

      <h2>{{ useLocalIcon ? 'Icon Absolute Path' : 'Icon URL' }}<span class="info">- png</span></h2>
      <input
        v-model="icon"
        :disabled="processing"
        :placeholder="useLocalIcon ? '/Users/example/Documents/example.png' : 'https://example.com/icon.png'"/>

      <label class="checkbox-wrapper">
        Use Local Icon
        <input
          v-model="useLocalIcon"
          :disabled="processing"
          type="checkbox">
        <span class="checkmark"/>
      </label>

      <h2> Size <span class="info">- pixels</span> </h2>
      <div class="size-row">
        <input
          v-model="width"
          :disabled="fullscreen || processing"
          placeholder="Width"/>
        <input
          v-model="height"
          :disabled="fullscreen || processing"
          placeholder="Height"/>
      </div>
      

      <label class="checkbox-wrapper">
        Launch in Full Screen
        <input
          v-model="fullscreen"
          :disabled="processing"
          type="checkbox"
          checked="checked">
        <span class="checkmark"/>
      </label>

      <label class="checkbox-wrapper">
        Frameless Application
        <input
          v-model="frameless"
          :disabled="processing"
          type="checkbox">
        <span class="checkmark"/>
      </label>

      <div class="button-row">
        <button 
          :disabled="!canSubmit"
          @click="submit">
            <div
              v-if="processing"
              class="loader" />
            <div v-else> Create Application </div> 
        </button>
        <div 
          v-if="status"
          :class="{ 'warning': warn }"
          class="status">{{ status }}</div> 
      </div>
    </div>
  </main>
</template>

<script>
import presets from '../presets'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      name: '',
      url: '',
      icon: '',
      useLocalIcon: false,
      fullscreen: true,
      width: '',
      height: '',
      frameless: false
    }
  },
  computed: {
    ...mapState({
      processing: state => state.processing,
      warn: state => state.warn,
      status: state => state.status
    }),
    canSubmit () {
      return !!(!this.processing && !this.status && this.name.trim() && this.url.trim())
    }
  },
  watch: {
    'name' (after, before) {
      try {
        const { url, iconUrl } = presets.getPreset(after)
        if (url && iconUrl) {
          this.url = url
          this.useLocalIcon = false
          this.icon = iconUrl
        } else {
          this.url = ''
          this.icon = ''
        }
      } catch (err) {}
    },
    'useLocalIcon' (after, before) {
      this.icon = ''
    },
    'fullscreen' (after, before) {
      this.height = ''
      this.width = ''
    }
  },
  methods: {
    ...mapActions([
      'createApplication'
    ]),

    /**
     * Exits and closes the application
     */
    exit () {
      window.close()
    },

    /**
     * Submits the form and creates the application asynchronously
     */
    submit () {
      if (!this.canSubmit) { return }

      // handled asynchronously
      this.createApplication({
        name: this.name,
        url: this.url,
        useLocalIcon: this.useLocalIcon,
        icon: this.icon,
        fullscreen: this.fullscreen,
        width: this.width,
        height: this.height,
        frameless: this.frameless
      })
    }
  }
}
</script>

<style lang="scss" scoped>
   @import '../styles/views/Main.scss';
</style>
