<template>
  <v-container class="centerAlign">
    <v-card class="mx-auto text-center" max-width="344">
      <v-card-text class="cardTextStyle">
        <div class="text--primary logoFont">Canvas</div>
      </v-card-text>
      <v-card-actions>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                class="formFont"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ><template slot='append'><span><font-awesome-icon
                    :icon="['far', 'envelope']"
                    class="mr-2 mb-1 envelopeStyle"
                  />
                  </span></template></v-text-field>
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
                <v-btn block color="success" class="formFont mr-4" @submit.prevent @click="logInEmail"
                  ><font-awesome-icon
                    :icon="['fa', 'sign-in-alt']"
                    class="mr-2 mb-1"
                  />
                  Log In</v-btn
                >
              </v-col>
            </v-row>
            <div class="formFont separator">OR</div>
            <v-row>
              <v-col cols="12">
                <v-btn block color="primary" class="formFont mr-4" @submit.prevent @click="logInFacebook"
                  ><font-awesome-icon
                    :icon="['fab', 'facebook-f']"
                    class="mr-2 mb-1"
                  />
                  Log In</v-btn
                >
              </v-col>
              <v-col cols="12">
                <v-btn block color="error" class="formFont mr-4" @submit.prevent @click="logInGoogle"
                  ><font-awesome-icon :icon="['fab', 'google']" class="mr-2 mb-1" />
                  Log In</v-btn
                >
              </v-col>
                <v-card-text class="formFont cardTextStyle"><router-link to="/password/reset/link" class="linkStyle">Forgot Password?</router-link></v-card-text>
            </v-row>
          </v-container>
        </v-form>
      </v-card-actions>
    </v-card>
    <v-card class="formFont mx-auto text-center mt-5" max-width="344">
      <v-card-text class="cardTextStyle">
        <div>Need an account?</div>
        <router-link to="/signup" class="linkStyle">Sign Up</router-link>
      </v-card-text>
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
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passLockIconClosed: true,
      seePassword: 'Password'
    }
  },
  computed: {
    ...mapFields(['email', 'password'])
  },
  methods: {
    ...mapActions(['logInEmail', 'logInGoogle', 'logInFacebook']),
    passLock: function () {
      if (this.passLockIconClosed) {
        this.seePassword = 'Text'
        this.passLockIconClosed = false
      } else {
        this.seePassword = 'Password'
        this.passLockIconClosed = true
      }
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
font-family: 'Josefin Slab', serif;
font-weight: bold;
}
.cardTextStyle{
    padding: 8px;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}
.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
}
.separator::before {
  margin-right: 0.25em;
}
.separator::after {
  margin-left: 0.25em;
}
.linkStyle {
  text-decoration: none;
  font-weight: bold;
}
.passLockStyle, .envelopeStyle {
  color: inherit;
}
.passLockStyle:hover {
cursor: pointer;
}
</style>
