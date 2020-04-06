<template>
  <v-layout>
    <v-flex>
      <div v-for="content in blogPostData" :key="content.id">
        <v-row>
          <v-col>
            <SingleBlogPost :content="content" />
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
                  <v-list-item v-for="data in fetchedData" :key="data._id">
                    <FetchedDBData :data="data" />
                  </v-list-item>
                  <v-list-item
                    v-for="(message, index) in messages"
                    :key="index"
                  >
                    <FetchedPusherData :message="message" />
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
import SingleBlogPost from '../components/SingleBlogPost'
import FetchedDBData from '../components/FetchedDBData'
import FetchedPusherData from '../components/FetchedPusherData'

export default {
  name: 'inspire',
  components: {
    SingleBlogPost,
    FetchedDBData,
    FetchedPusherData
  },
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
