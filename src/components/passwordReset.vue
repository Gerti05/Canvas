<template>
  <v-container class="centerAlign">
    <v-card class="mx-auto text-center" max-width="344">
      <v-card-text class="cardTextStyle">
        <div class="text--primary logoFont">Canvas</div>
      </v-card-text>
      <v-card-actions v-if="!passwordReset">
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                class="formFont"
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  :type="seePassword"
                  required
                ><template slot='append'>
                  <span @click="passLock()" v-if="passLockIconClosed"><font-awesome-icon
                    :icon="['fas', 'lock']"
                    class="mr-2 mb-1 passLockStyle"
                  /></span>
                  <span @click="passLock()" v-else><font-awesome-icon
                    :icon="['fas', 'lock-open']"
                    class="mr-2 mb-1 passLockStyle"
                  /></span>
                  </template></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  color="success"
                  class="formFont"
                  :disabled="!valid"
                  @submit.prevent
                  @click="confirmResetPassword();
                  passwordResetUpdate()"
                  ><font-awesome-icon
                    :icon="['fa', 'sign-in-alt']"
                    class="mr-2 mb-1"
                  />
                  Enter New Password</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-actions>
      <section class="mt-3" v-else>
       <v-row>
        <v-col cols="12">
          <font-awesome-icon
                    :icon="['far', 'check-square']"
                    class="mb-3" color="green"
                  />
            <h3 class="formFont mb-3">Your password has been changed.</h3>
        </v-col>
      </v-row>
        <router-link to="/" class="linkStyle"
          ><v-btn block color="grey darken-1" class="formFont backBtnStyle"
            >Back To Login</v-btn
          ></router-link
        >
      </section>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  data: function () {
    return {
      valid: false,
      passwordRules: [v => !!v || 'Password is required'],
      passLockIconClosed: true,
      seePassword: 'Password',
      passwordReset: false
    }
  },
  computed: {
    ...mapFields(['password'])
  },
  methods: {
    ...mapActions(['confirmResetPassword']),
    passLock: function () {
      if (this.passLockIconClosed) {
        this.seePassword = 'Text'
        this.passLockIconClosed = false
      } else {
        this.seePassword = 'Password'
        this.passLockIconClosed = true
      }
    },
    passwordResetUpdate: function () {
      console.log('link sent')
      this.passwordReset = true
    }
  }
}
</script>

<style scoped>
.centerAlign {
  margin-top: 10vh !important;
}
.logoFont {
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em;
  font-family: "Fredericka the Great", cursive;
}
.formFont {
  font-family: "Josefin Slab", serif;
  font-weight: bold;
}
.cardTextStyle {
  padding: 8px;
}
.linkStyle {
  text-decoration: none;
  font-weight: bold;
}
.backBtnStyle {
  color: white !important;
}
</style>
