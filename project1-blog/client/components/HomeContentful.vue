<template>
  <v-row justify="space-between">
    <div v-for="content in contentfulData" :key="content.id">
      <v-col>
        <v-card class="mx-auto" max-width="800" width="100%">
          <div
            v-for="image in content.fields.headerImage.fields"
            :key="image.id"
          >
            <v-img
              v-if="image.url"
              max-height="400px"
              height="100%"
              :src="image.url"
            ></v-img>
          </div>
          <v-card-title>{{ content.fields.title }}</v-card-title>
          <v-card-text class="body_text">{{ content.fields.body }}</v-card-text>
          <v-card-actions>
            <v-btn color="orange" text @click="toBlogPost(content.fields.slug)">
              Read More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </div>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      filterdArray: []
    }
  },
  async mounted() {
    await this.fetchContentfulData()
  },
  computed: {
    ...mapState('contentful', ['contentfulData'])
  },
  methods: {
    ...mapActions('contentful', ['fetchContentfulData']),
    toBlogPost(slug) {
      this.$router.push({ name: 'inspire', params: { id: slug } })
    }
  }
}
</script>

<style scoped>
.body_text {
  display: block;
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
