<template>
  <div
    style="max-width: 600px;
    position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);"
  >
    <v-card class="px-4">
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
              <v-btn
                block
                outlined
                :disabled="!valid"
                @click="firebaseLogin"
                color="primary"
                >Login</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    email: "",
    password: "",
    show: false,
    valid: true,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    firebaseLogin() {
      if (this.$refs.loginForm.validate()) {
        try {
          this.$fire.auth
            .signInWithEmailAndPassword(this.email.trim(), this.password)
            .then(() => this.$router.push("/"));
        } catch (e) {
          alert(e);
        }
      }
    },
  },
};
</script>
