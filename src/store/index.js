import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false,
    password: '',
    passwordRules: [v => !!v || 'Password is required'],
    username: '',
    usernameRules: [v => !!v || 'Username is required'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  },
  mutations: {
    updateEmail (state, email) {
      state.email = email
    },
    updatePassword (state, password) {
      state.password = password
    },
    updateUsername (state, username) {
      state.username = username
    },
    updateIsSignedIn (state) {
      console.log(state.isSignedIn)
      state.isSignedIn = !state.isSignedIn
      console.log(state.isSignedIn)
    }
  },
  actions: {
  },
  modules: {
  }
})
