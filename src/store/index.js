import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/auth'
import FirebaseConfig from '../components/firebaseConfig'
import UserIcon from '../assets/blankUserIcon.svg'
import { getField, updateField } from 'vuex-map-fields'
import createPersistedState from 'vuex-persistedstate'
const app = firebase.initializeApp(FirebaseConfig)
const providerGoogle = new firebase.auth.GoogleAuthProvider()
const providerFacebook = new firebase.auth.FacebookAuthProvider()

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    user: null,
    password: '',
    username: '',
    email: ''
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    updateEmail (state, email) {
      state.email = email
    },
    updatePassword (state, password) {
      state.password = password
    },
    updateUsername (state, username) {
      state.username = username
    },
    updateIsSignedIn (state, user) {
      console.log(user, '5')
      state.user = user
    }
  },
  actions: {
    logInEmail () {
      app
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          user => {
            console.log(user.user.displayName)
            alert(`You are logged in as ${user.user.displayName}`)
          },
          err => {
            alert(err.message)
          }
        )
    },
    logInGoogle () {
      app
        .auth()
        .signInWithPopup(providerGoogle)
        .then(user => {
          console.log(user.user)
          console.log(router.currentRoute.fullPath)
          if (router.currentRoute.fullPath !== '/') {
            router.push('/')
          }
        })
        .catch(err => {
          alert(err.message)
        })
    },
    logInFacebook () {
      app
        .auth()
        .signInWithPopup(providerFacebook)
        .then(user => {
          console.log(user.user)
          console.log(router.currentRoute.fullPath)
          if (router.currentRoute.fullPath !== '/') {
            router.push('/')
          }
        })
        .catch(err => {
          alert(err.message)
        })
    },
    signUpEmail ({ dispatch }) {
      app
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          user => {
            console.log(user)
            dispatch('addUsername')
            dispatch('verifyEmailLink')
            alert(`Account created for ${this.state.username}.`)
            router.push('/')
          },
          err => {
            alert(err.message)
          }
        )
    },
    verifyEmailLink () {
      const user = app.auth().currentUser
      user
        .sendEmailVerification()
        .then(() => {
        })
        .catch(err => {
          alert(err.message)
        })
    },
    signOut ({ commit }) {
      app
        .auth()
        .signOut()
        .then(
          () => {
            sessionStorage.clear()
            commit('updateIsSignedIn', null)
          },
          err => {
            alert(err.message)
          }
        )
    },
    checkUser ({ commit }) {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          commit('updateIsSignedIn', user)
        } else {
          commit('updateIsSignedIn', null)
        }
      })
    },
    addUsername () {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          // Updates the user attributes:
          console.log(this.state.username)
          user.updateProfile({
            // <-- Update Method here
            displayName: this.state.username,
            photoURL: UserIcon
          })
        }
      })
    },
    resetPasswordLink ({ state }) {
      app
        .auth()
        .sendPasswordResetEmail(state.email)
        .then(() => {})
        .catch(err => {
          alert(err.message)
        })
    },
    confirmResetPassword ({ state }) {
      let code = router.currentRoute.fullPath
      code = code.split('Code=')
      code = code[1].split('&apiKey')
      code = code[0]
      app
        .auth()
        .confirmPasswordReset(code, state.password)
        .then(() => {})
        .catch(err => {
          alert(err.message)
        })
    }
  },
  modules: {}
})
