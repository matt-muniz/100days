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
              <v-card-actions>
                <v-btn color="orange" text @click="toBlogPost(content.slug)">
                  Click
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import Pusher from 'pusher-js'
// import axios from 'axios'
import { createClient } from 'contentful'

export default {
  name: 'home',
  data() {
    return {
      contentfulData: []
    }
  },
  created() {
    this.fetchContentfulData()
  },
  methods: {
    async fetchContentfulData() {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: 'qmbfbfyde358',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: 'dJVVdyqWnCMCx0B0-poZfmK0e5GeUfWOzN4Bn855gPE'
      })
      const { items } = await client.getEntries()

      items.forEach((item) => this.contentfulData.push(item.fields))
    },
    toBlogPost(slug) {
      this.$router.push({ name: 'inspire', params: { id: slug } })
    }
  }
}
</script>
