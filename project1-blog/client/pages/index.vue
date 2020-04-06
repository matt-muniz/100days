<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div v-for="content in contentfulData" :key="content.id">
        <v-row>
          <v-col>
            <v-card class="mx-auto" max-width="800" width="100%">
              <div
                v-for="image in content.fields.headerImage.fields"
                :key="image.id"
              >
                <v-img
                  v-if="image.url"
                  max-height="300px"
                  height="100%"
                  :src="image.url"
                ></v-img>
              </div>
              <v-card-title>{{ content.fields.title }}</v-card-title>
              <v-card-text>{{ content.fields.body }}</v-card-text>
              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                  @click="toBlogPost(content.fields.slug)"
                >
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  data() {
    return {}
  },
  mounted() {
    this.fetchContentfulData()
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
