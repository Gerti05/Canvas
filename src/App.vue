<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  mounted () {
    this.checkUser()
  },
  methods: {
    ...mapActions(['checkUser'])
  }
}
</script>
