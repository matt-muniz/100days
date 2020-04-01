<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div v-for="content in contentfulData" :key="content.id">
        <v-row>
          <v-col>
            <v-card class="mx-auto" max-width="800" width="100%">
              <div v-for="image in content.headerImage.fields" :key="image.id">
                <v-img
                  v-if="image.url"
                  max-height="300px"
                  height="100%"
                  :src="image.url"
                ></v-img>
              </div>
              <v-card-title>{{ content.title }}</v-card-title>
              <v-card-text>{{ content.body }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-for="d in fetchedData" :key="d._id">
        <p v-if="d.comments">{{ d.title }} - {{ d.comments }}</p>
      </div>
      <div v-for="(message, index) in messages" :key="index">
        {{ message.title }}
        {{ message.comments }}
      </div>
    </v-flex>
    <v-btn @click="postData">Click</v-btn>
  </v-layout>
</template>

<script>
import Pusher from 'pusher-js'
import axios from 'axios'
import { createClient } from 'contentful'

const BASE_URL = 'http://localhost:5000'

export default {
  data() {
    return {
      messages: [],
      fetchedData: [],
      contentfulData: []
    }
  },
  created() {
    this.subscribe()
    this.fetchData()
    this.fetchContentfulData()
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(`${BASE_URL}/api/logs`)
      this.fetchedData = data.comments
    },
    async postData() {
      const post = await axios.post(`${BASE_URL}/api/logs`, {
        title: 'Day 6',
        comments:
          'I now have Contentful showing on the frontend and mongdb/mongoose and pusherjs working in the backend/connected to the frontend'
      })
      return post
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
    },
    async fetchContentfulData() {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: 'qmbfbfyde358',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: 'dJVVdyqWnCMCx0B0-poZfmK0e5GeUfWOzN4Bn855gPE'
      })
      const { items } = await client.getEntries()
      items.forEach((item) => this.contentfulData.push(item.fields))
    }
  }
}
</script>
