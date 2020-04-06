import axios from 'axios'
const BASE_URL = 'http://localhost:5000'

export default {
  namespaced: true,
  state: () => ({
    fetchedData: []
  }),

  mutations: {
    FETCHED_DATA(state, payload) {
      state.fetchedData = payload
    }
  },

  actions: {
    async fetchData({ commit }, params) {
      const { data } = await axios.get(`${BASE_URL}/api/logs`)

      const fetchedData = data.comments.filter(
        (slug) => slug.blogSlug === params
      )
      commit('FETCHED_DATA', fetchedData)
    },
    async postData({ commit }, obj) {
      const post = await axios.post(`${BASE_URL}/api/logs`, obj)

      return post
    }
  },

  getters: {}
}
