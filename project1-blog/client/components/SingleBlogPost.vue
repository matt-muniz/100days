<template>
  <v-card v-if="content" class="mx-auto" max-width="800" width="100%">
    <div>
      <v-img
        max-height="300px"
        height="100%"
        :src="content.fields.headerImage.fields.file.url"
      ></v-img>
    </div>
    <v-card-title>{{ content.fields.title }}</v-card-title>
    <v-card-text
      class="body-1"
      v-html="markedDownData(content.fields.body)"
    ></v-card-text>
  </v-card>
</template>

<script>
import marked from 'marked'

export default {
  props: ['content'],
  methods: {
    markedDownData(params) {
      return marked(params, { sanitize: true })
    }
  }
}
</script>

<style></style>
