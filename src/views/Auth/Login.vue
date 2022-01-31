<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset="3">
        <v-card class="pa-3 card-setup" color="#ECEEEF">
          <h1 class="text-center text-uppercase grey--text mb-6">Login</h1>
          <v-form v-model="valid" @submit.prevent="login">
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="E-mail"
              required
              outlined
              background-color="white"
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              @click:append="show1 = !show1"
              outlined
              background-color="white"
            ></v-text-field>
            <v-btn
              color="primary"
              block
              :disabled="!valid"
              type="submit"
              class="mb-3"
              >Login</v-btn
            >
            <v-snackbar
              v-model="snackbar"
              :vertical="vertical"
              :timeout="timeout"
              color="green darken-4"
            >
              {{ text }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="white"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
            <div class="d-flex">
              <span>Don’t have account?</span>
              <router-link
                class="d-block text-center text-decoration-none black--text font-weight-bold mb-3 ml-2"
                :to="{ name: 'Register' }"
                >Register Now</router-link
              >
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    show1: false,
    form: {
      password: "",
      email: "",
    },
    snackbar: false,
    text: "Your are login now.",
    vertical: true,
    timeout: 2000,
  }),

  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),

    login() {
      this.signIn(this.form).then(() => {
        this.snackbar = true;
        this.$router.replace({ name: "Dashboard" }).catch(() => {});
      });
    },
  },
};
</script>

<style lang="scss">
.card-setup {
  top: 50%;
}
</style>
