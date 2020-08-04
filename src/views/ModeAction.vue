<template>
  <div>
    <PasswordReset v-if="(modeName === 'resetPassword')" />
    <VerifyEmail v-else-if="(modeName === 'verifyEmail')" />
    <RecoverEmail v-else-if="(modeName === 'recoverEmail')" />
    <ErrorPage v-else />
  </div>
</template>

<script>
import PasswordReset from '@/components/passwordReset'
import VerifyEmail from '@/components/verifyEmail'
import RecoverEmail from '@/components/recoverEmail'
import ErrorPage from '@/components/errorPage'

function getParameterByName (name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  var regexS = '[\\?&]' + name + '=([^&#]*)'
  var regex = new RegExp(regexS)
  var results = regex.exec(window.location.href)
  console.log(results)
  if (results == null) {
    return ''
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, ' '))
  }
}

// Get the action to complete.
var mode = getParameterByName('mode')

export default {
  data: function () {
    return {
      modeName: mode
    }
  },
  components: {
    PasswordReset,
    VerifyEmail,
    RecoverEmail,
    ErrorPage
  }
}
</script>

<style></style>
