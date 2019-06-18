export default {
  state: {
    tasks: [
      {
        'id': 1,
        'title': 'Iron Man',
        'description': 'aaaaa',
        'whatWatch': 'Film',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'Doctor Strange',
        'description': 'bbbbb',
        'whatWatch': 'Serial',
        'completed': false,
        'editing': false
      }
    ]
  },
  mutations: {
    newTask (state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    newTask ({commit}, payload) {
      commit('newTask', payload)
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    }
  }
}
