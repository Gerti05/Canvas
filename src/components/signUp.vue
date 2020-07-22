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
                  required
                  type="Password"
                ></v-text-field>
                <v-text-field
                  class="formFont"
                  v-model="username"
                  maxlength="15"
                  :counter="15"
                  :rules="usernameRules"
                  label="Username"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  color="success"
                  class="formFont mr-4"
                  @click="signUpEmail"
                  ><font-awesome-icon
                    :icon="['fa', 'user-plus']"
                    class="mr-2 mb-1"
                  />
                  Sign Up</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-actions>
    </v-card>
    <v-card class="formFont mx-auto text-center mt-5" max-width="344">
      <v-card-text class="cardTextStyle">
        <div>Have an account?</div>
        <router-link to="/" class="linkStyle">Log In</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import FirebaseConfig from './firebaseConfig'
import UserIcon from '../assets/blankUserIcon.svg'
import { mapState } from 'vuex'
const app = firebase.initializeApp(FirebaseConfig)

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
    username: {
      get () {
        return this.$store.state.username
      },
      set (value) {
        this.$store.commit('updateUsername', value)
      }
    },
    ...mapState(['emailRules', 'passwordRules', 'usernameRules'])
  },
  methods: {
    signUpEmail (e) {
      app
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.writeUserData(user)
            console.log(user)
            alert(`Account created for ${this.username}.`)
            this.$store.commit('updateIsSignedIn')
            this.$router.push('/')
          },
          err => {
            alert(err.message)
          }
        )
      e.preventDefault()
    },
    writeUserData (user) {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          // Updates the user attributes:
          console.log(this.username)
          user
            .updateProfile({
              // <-- Update Method here
              displayName: this.username,
              photoURL: UserIcon
            })
            .then(
              () => {},
              err => {
                alert(err.message)
              }
            )
        }
      })
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
