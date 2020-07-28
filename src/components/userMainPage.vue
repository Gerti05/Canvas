<template>
  <v-container>
    <div class="textStyle">Hello Gerti</div>
    <v-btn @submit.prevent @click="signOut">Sign Out</v-btn>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['signOut'])
  }
}
</script>

<style scoped>
.textStyle {
  color: tomato;
  font-size: 100px !important;
}
</style>
