<template>
  <v-layout>
    <v-flex class="text-center">
      <div v-for="content in fetchedData" :key="content.id">
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
  name: 'inspire',
  data() {
    return {
      fetchedData: []
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
      if (this.$route.params.id) {
        const blogPost = items.filter(
          (item) => item.fields.slug === this.$route.params.id
        )
        this.fetchedData = blogPost
      }
    }
  }
}
</script>

<style></style>
