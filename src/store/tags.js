export default {
  state: {
    tags: [
      {
        title: 'Phase 1',
        use: false
      },
      {
        title: 'Phase 2',
        use: false
      },
      {
        title: 'Phase 3',
        use: false
      }
    ]
  },
  mutations: {
    newTag (state, payload) {
      state.tags.push(payload)
    }
  },
  actions: {
    newTag ({commit}, payload) {
      commit('newTag', payload)
    }
  },
  getters: {
    tags (state) {
      return state.tags
    }
  }
}
