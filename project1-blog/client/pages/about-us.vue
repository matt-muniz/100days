<template>
  <v-layout>
    <v-flex>
      <div>
        <v-row>
          <v-col>
            <SingleBlogPost :content="blogPostData[0]" />
            <v-card class="mx-auto pb-5" max-width="800" width="100%">
              <v-row justify="center">
                <v-col cols="11">
                  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
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
                          @click="reset('a')"
                          >Leave your comment</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SingleBlogPost from '../components/SingleBlogPost'

export default {
  name: 'about-us',
  components: {
    SingleBlogPost
  },
  data() {
    return {
      valid: true,
      name: '',
      comments: '',
      lazy: false
    }
  },
  created() {},
  computed: {
    ...mapState('contentful', ['blogPostData'])
  },
  methods: {
    reset(args) {
      this.$refs.form.reset()
    },
    ...mapActions('contentful', ['fetchContentfulData'])
  }
}
</script>

<style></style>
