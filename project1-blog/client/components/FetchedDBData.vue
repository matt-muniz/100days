<template>
  <v-list-item-content class="ma-0 pa-0 pb-2">
    <v-list-item-title class="pb-1">
      {{ data.name }}
    </v-list-item-title>
    <v-list-item-subtitle>
      {{ data.comments }}
    </v-list-item-subtitle>
    <v-divider></v-divider>
  </v-list-item-content>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style></style>
