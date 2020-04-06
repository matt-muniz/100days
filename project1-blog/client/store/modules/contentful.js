import { client } from '../../middleware/contentful'

export default {
  namespaced: true,
  state: () => ({
    contentfulData: [],
    blogPostData: []
  }),

  mutations: {
    SET_CONTENTFUL_DATA(state, payload) {
      state.contentfulData = payload
    },
    SET_BLOGPOST_DATA(state, payload) {
      state.blogPostData = payload
    }
  },

  actions: {
    async fetchContentfulData({ commit }, params) {
      const { items } = await client.getEntries()
      commit('SET_CONTENTFUL_DATA', items)
      if (params) {
        const blogPost = items.filter((item) => item.fields.slug === params)
        commit('SET_BLOGPOST_DATA', blogPost)
      }
    }
  },

  getters: {}
}
