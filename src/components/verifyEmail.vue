<template>
  <v-container class="centerAlign">
    <v-card class="mx-auto text-center" max-width="344">
      <v-card-text class="cardTextStyle">
        <div class="text--primary logoFont">Canvas</div>
      </v-card-text>
      <section class="mt-3" v-if="!emailVerified">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h3 class="formFont mb-3">Welcome, {{ username }}!</h3>
              <p class="formFont mb-1">
                You have successfully created a Canvas account. Please click the
                button below to verify your email address and complete your
                registration.
              </p>
            </v-col>
            <v-col>
              <v-btn
                block
                color="success"
                class="formFont"
                @submit.prevent
                @click="
                  handleVerifyEmail(actionCodeNum);
                  verifyEmail();
                "
                >Verify Email</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="mt-3" v-else>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h3 class="formFont mb-3">Thanks!</h3>
              <p class="formFont mb-1">
                Your email has been verified.
              </p>
            </v-col>
            <v-col>
              <router-link to="/" class="linkStyle"
                ><v-btn block color="success" class="formFont"
                  >Main Page</v-btn
                ></router-link
              >
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-card>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

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

var actionCode = getParameterByName('oobCode')

export default {
  data: function () {
    return {
      emailVerified: false,
      actionCodeNum: actionCode
    }
  },
  computed: {
    ...mapFields(['username'])
  },
  methods: {
    ...mapActions(['handleVerifyEmail']),
    verifyEmail: function () {
      console.log('zzzz')
      this.emailVerified = true
    }
  }
}
</script>

<style>
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
</style>
