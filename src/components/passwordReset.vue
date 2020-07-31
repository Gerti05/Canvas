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
                  @click="confirmResetPassword"
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
      seePassword: 'Password'
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
