<template>
  <v-layout>
    <v-flex>
      {{ this.$route.params.id }}
      <div v-for="content in blogPostData" :key="content.id">
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
                      background-color="white"
                      light
                      outlined
                      label="Enter your name"
                    ></v-text-field>
                    <v-textarea
                      v-model="comments"
                      background-color="white"
                      light
                      label="Leave a comment! Tell me what you think."
                      auto-grow
                      clearable
                      outlined
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
                          @click="postData(setCommentData)"
                          >Leave your comment</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-list
                  v-if="fetchedData.length > 0 || messages.length > 0"
                  light
                  width="95%"
                >
                  <v-list-item v-for="d in fetchedData" :key="d._id">
                    <v-list-item-content class="ma-0 pa-0 pb-2">
                      <v-list-item-title class="pb-1">
                        {{ d.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ d.comments }}
                      </v-list-item-subtitle>
                      <v-divider></v-divider>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    v-for="(message, index) in messages"
                    :key="index"
                  >
                    <v-list-item-content class="ma-0 pa-0 pb-2">
                      <v-list-item-title class="pb-1">
                        {{ message.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ message.comments }}
                      </v-list-item-subtitle>
                      <v-divider></v-divider>
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'inspire',
  data() {
    return {
      form: true,
      valid: false,
      messages: [],
      name: '',
      comments: '',
      commentData: {}
    }
  },
  created() {
    this.subscribe()
    this.fetchData(this.$route.params.id)
    if (this.$route.params.id) {
      this.fetchContentfulData(this.$route.params.id)
    } else {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState('contentful', ['blogPostData']),
    ...mapState('db', ['fetchedData']),
    setCommentData() {
      return {
        blogSlug: this.$route.params.id,
        name: this.name ? this.name : 'User',
        comments: this.comments
      }
    }
  },
  methods: {
    subscribe() {
      const pusher = new Pusher(process.env.PUSHER_AECCESS_TOKEN, {
        cluster: 'us2',
        forceTLS: true
      })
      const channel = pusher.subscribe('Blog-Comments')
      channel.bind('new-event', (data) => {
        this.messages.push(data)
      })
    },
    ...mapActions('contentful', ['fetchContentfulData']),
    ...mapActions('db', ['fetchData']),
    ...mapActions('db', ['postData'])
  }
}
</script>

<style></style>
