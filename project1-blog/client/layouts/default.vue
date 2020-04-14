<template>
  <v-app dark>
    <v-app-bar fixed app>
      <nuxt-link to="/">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
      <v-tabs right>
        <v-tab nuxt to="/">Home</v-tab>
        <v-tab nuxt to="about-us">About Us</v-tab>
        <v-tab v-if="this.$route.params.id" nuxt to="inspire">
          {{ this.$route.params.id }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tech Blog'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
