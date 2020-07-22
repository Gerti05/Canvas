<template>
  <v-container>
    <div class="textStyle">Hello World</div>
    <v-btn @click="signOut">Sign Out</v-btn>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  methods: {
    signOut (e) {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            this.$store.commit('updateIsSignedIn')
            // this.$router.push('/')
          },
          err => {
            alert(err.message)
          }
        )
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
.textStyle {
  color: tomato;
  font-size: 100px !important;
}
</style>
