<template>
  <v-container class="centerAlign">
    <v-card class="mx-auto text-center" max-width="344">
      <v-card-text class="cardTextStyle">
        <div class="text--primary logoFont">Canvas</div>
      </v-card-text>
      <v-card-actions>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                class="formFont"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                class="formFont"
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  type="Password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn block color="success" class="formFont mr-4" @click="logInEmail"
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
                <v-btn block color="primary" class="formFont mr-4"
                  ><font-awesome-icon
                    :icon="['fab', 'facebook-f']"
                    class="mr-2 mb-1"
                  />
                  Log In</v-btn
                >
              </v-col>
              <v-col cols="12">
                <v-btn block color="error" class="formFont mr-4"
                  ><font-awesome-icon :icon="['fab', 'google']" class="mr-2 mb-1" />
                  Log In</v-btn
                >
              </v-col>
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
import firebase from 'firebase/app'
import 'firebase/auth'
import { mapState } from 'vuex'

export default {
  computed: {
    email: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('updateEmail', value)
      }
    },
    password: {
      get () {
        return this.$store.state.password
      },
      set (value) {
        this.$store.commit('updatePassword', value)
      }
    },
    ...mapState(['emailRules', 'passwordRules'])
  },
  methods: {
    logInEmail (e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user.user.displayName)
            alert(`You are logged in as ${user.user.displayName}`)
            this.$store.commit('updateIsSignedIn')
          },
          err => {
            alert(err.message)
          }
        )
      e.preventDefault()
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
</style>
