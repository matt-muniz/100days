<template>
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
</template>

<script>
export default {
  props: ['content']
}
</script>

<style></style>
