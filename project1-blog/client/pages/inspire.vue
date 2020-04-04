<template>
  <v-layout>
    <v-flex>
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
            <v-card class="mx-auto" max-width="800" width="100%">
              <v-row justify="center">
                <v-col cols="11">
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                      v-model="name"
                      outlined
                      label="Enter your name"
                    ></v-text-field>
                    <v-textarea
                      label="Leave a comment! Tell me what you think."
                      auto-grow
                      clearable
                      outlined
                      v-model="comments"
                      :rules="[
                        (v) =>
                          !!v ||
                          'Please fill out this field to submit your comment'
                      ]"
                      required
                    ></v-textarea>
                    <v-row justify="center">
                      <v-col cols="4">
                        <v-btn
                          block
                          :disabled="!valid || comments === ''"
                          @click="postData"
                          >Leave your comment</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-list light width="95%">
                  <v-list-item v-for="d in fetchedData" :key="d._id">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ d.name }}
                      </v-list-item-title>
                      <v-card-text>
                        {{ d.comments }}
                      </v-card-text>
                      <v-divider></v-divider>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    v-for="(message, index) in messages"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ message.name }}
                      </v-list-item-title>
                      <v-card-text>
                        {{ message.comments }}
                      </v-card-text>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-row>
            </v-card>
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
