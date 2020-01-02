import Vue from 'vue'
import Vuex from 'vuex'

import task from './task'
import common from './common'
import user from './user'
import tags from './tags'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    task,
    tags
  }
})
