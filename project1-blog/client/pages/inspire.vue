<template>
  <v-layout>
    <v-flex class="text-center">
      <div v-for="content in contentfulData" :key="content.id">
        <v-row>
          <v-col>
            <v-card class="mx-auto" max-width="800" width="100%">
              <div>
                <v-img
                  max-height="300px"
                  height="100%"
                  :src="content.fields.headerImage.fields.file.url"
                ></v-img>
              </div>
              <v-card-title>{{ content.fields.title }}</v-card-title>
              <v-card-text>{{ content.fields.body }}</v-card-text>
            </v-card>

            <div v-for="d in fetchedData" :key="d._id">
              <p v-if="d.comments">{{ d.name }} - {{ d.comments }}</p>
            </div>
            <div v-for="(message, index) in messages" :key="index">
              <p>{{ message.name }} - {{ message.comments }}</p>
            </div>
            <v-form ref="form" v-model="valid">
              <v-text-field v-model="name"></v-text-field>
              <v-text-field v-model="comments" required></v-text-field>
              <v-btn @click="postData">Click</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Pusher from 'pusher-js'
import axios from 'axios'
import { createClient } from 'contentful'

const BASE_URL = 'http://localhost:5000'

export default {
  name: 'inspire',
  data() {
    return {
      valid: false,
      messages: [],
      fetchedData: [],
      contentfulData: [],
      name: '',
      comments: ''
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

      this.fetchedData = data.comments.filter(
        (slug) => slug.blogSlug === this.$route.params.id
      )
    },
    async postData() {
      const post = await axios.post(`${BASE_URL}/api/logs`, {
        blogSlug: this.$route.params.id,
        name: this.name ? this.name : 'User',
        comments: this.comments
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
      if (this.$route.params.id) {
        const blogPost = items.filter(
          (item) => item.fields.slug === this.$route.params.id
        )
        this.contentfulData = blogPost
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style></style>
