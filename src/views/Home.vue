<template>
  <div class="home">
    <LogIn v-if="isSignedIn === false" />
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
  computed: { ...mapState(['isSignedIn']) },
  components: {
    UserMainPage,
    LogIn
  }
}
</script>
