<template>
  <v-container class="centerAlign">
    <v-card class="mx-auto text-center" max-width="344">
      <v-card-text class="cardTextStyle">
        <div class="text--primary logoFont">Canvas</div>
      </v-card-text>
      <v-card-actions v-if="!linkSent">
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
                  ><template slot="append"
                    ><span
                      ><font-awesome-icon
                        :icon="['far', 'envelope']"
                        class="mr-2 mb-1 envelopeStyle"
                      /> </span></template
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  color="success"
                  class="formFont"
                  :disabled="!valid"
                  @submit.prevent
                  @click="
                    resetPasswordLink;
                    linkSentUpdate();
                  "
                  ><font-awesome-icon
                    :icon="['fa', 'sign-in-alt']"
                    class="mr-2 mb-1"
                  />
                  Send Link</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-actions>
      <v-row v-else>
        <v-col cols="12">
          <font-awesome-icon
                    :icon="['far', 'check-square']"
                    class="mb-3" color="green"
                  />
            <h2 class="formFont mb-3">Password Reset Email Sent</h2>
            <p class="formFont">An email was sent to {{email}}. Follow the directions in the email to reset your password.</p>
        </v-col>
      </v-row>
      <section class="mt-3">
        <router-link to="/" class="linkStyle"
          ><v-btn block color="grey darken-1" class="formFont backBtnStyle"
            >Back To Login</v-btn
          ></router-link
        >
      </section>
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
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      linkSent: false
    }
  },
  computed: {
    ...mapFields(['email'])
  },
  methods: {
    ...mapActions(['resetPasswordLink']),
    linkSentUpdate: function () {
      console.log('link sent')
      this.linkSent = true
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
