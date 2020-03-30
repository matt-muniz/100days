<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div v-for="d in fetchedData" :key="d._id">
        <p v-if="d.comments">{{ d.title }} - {{ d.comments }}</p>
      </div>
      <div v-for="(message, index) in messages" :key="index">
        {{ message.title }}
        {{ message.comments }}
      </div>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a href="https://vuetifyjs.com" target="_blank"> documentation </a>.
          </p>
          <p>
            If you have questions, please join the official
            <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a href="https://nuxtjs.org/" target="_blank">
            Nuxt Documentation
          </a>
          <br />
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Pusher from 'pusher-js'
import axios from 'axios'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
const BASE_URL = 'http://localhost:5000'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      messages: [],
      fetchedData: []
    }
  },
  created() {
    this.subscribe()
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(`${BASE_URL}/api/logs`)
      this.fetchedData = data.comments
    },
    subscribe() {
      const pusher = new Pusher('6a33f2e6e4b3290f9b48', {
        cluster: 'us2',
        forceTLS: true
      })

      const channel = pusher.subscribe('Blog-Comments')
      channel.bind('new-event', (data) => {
        this.messages.push(data)
      })
    }
  }
}
</script>
