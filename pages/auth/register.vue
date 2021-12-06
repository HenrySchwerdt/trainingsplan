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
        Register
      </v-card-title>
      <v-card-text>
        <v-form ref="registerForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                :rules="[rules.required]"
                label="Username"
                maxlength="20"
                required
              ></v-text-field>
            </v-col>
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
            <v-col cols="12">
              <v-text-field
                v-model="verify"
                block
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, passwordMatch]"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm Password"
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
                @click="firebaseRegister"
                color="primary"
                >Register</v-btn
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
    username: "",
    verify: "",
    valid: true,
    show: false,
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    async firebaseRegister() {
      if (this.$refs.registerForm.validate()) {
        try {
          this.$fire.auth
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
              return this.$fire.auth.currentUser.updateProfile({
                displayName: this.username,
              });
            })
            .then(() => {
              return this.$fire.auth.currentUser.sendEmailVerification();
            })
            .then(() => {
              this.$fire.firestore
                .collection("users")
                .doc(this.$fire.auth.currentUser.uid)
                .set({
                  userName: this.username,
                  joined_at: this.$fireModule.firestore.FieldValue.serverTimestamp(),
                  // doneTrainings: 0,
                  // donePlans: 0,
                  // numberOfPlans: 0,
                  // numberOfTrainings: 0,
                });
            })
            .then(() => {
              this.$router.push("/");
            });
        } catch (e) {
          alert(e);
        }
      }
    },
  },
};
</script>
