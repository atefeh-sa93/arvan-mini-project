<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset="3">
        <v-card class="pa-3 card-setup" color="#ECEEEF">
          <h1 class="text-center grey--text mb-6">Register</h1>
          <v-form v-model="valid" @submit.prevent="register">
            <v-text-field
              v-model="form.username"
              required
              label="user"
              outlined
              background-color="white"
            ></v-text-field>
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
              >Register</v-btn
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
              <span>Already Registered?</span>
              <router-link
                class="d-block text-center text-decoration-none black--text font-weight-bold mb-3 ml-2"
                :to="{ name: 'Login' }"
                >Login</router-link
              >
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data: () => ({
    valid: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    show1: false,
    form: {
      username: "",
      password: "",
      email: "",
    },
    snackbar: false,
    text: "Your registration is completed",
    vertical: true,
    timeout: 2000,
  }),

  methods: {
    register() {
      axios.post("/users", { user: this.form }).then((result) => {
        if (result.status === 200) {
          this.snackbar = true;
          this.form = {
            username: "",
            password: "",
            email: "",
          };
        }
      });
    },
  },
};
</script>
