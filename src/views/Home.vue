<template>
  <div class="home">
    <LogIn v-if="user === null" />
    <UserMainPage v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import UserMainPage from '@/components/userMainPage'
import LogIn from '@/components/logIn'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: { ...mapState(['user']) },
  components: {
    UserMainPage,
    LogIn
  }
}
</script>
