// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.config.productionTip = false
Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyCSJBSXUJfUNy_Ti0l_ifBj7hQUdbdccfE',
      authDomain: 'marveli-za.firebaseapp.com',
      databaseURL: 'https://marveli-za.firebaseio.com',
      projectId: 'marveli-za',
      storageBucket: '',
      messagingSenderId: '318980020590',
      appId: '1:318980020590:web:3d6ab2f7b1b222e7'
    }
    firebase.initializeApp(firebaseConfig)
  }
})
