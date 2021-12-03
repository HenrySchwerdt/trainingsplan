<template>
  <v-app>
    <v-app-bar app color="white" flat class="mt-2">
      <div>
        <a href="/">
          <img
            width="200px"
            height="200px"
            src="~/assets/logo_transparent.png"
            alt="asda"
          />
        </a>
      </div>
      <v-spacer></v-spacer>
      <a v-if="$store.state.user" href="/app" style="text-decoration: none"
        ><v-btn icon color="#A82465"><v-icon> mdi-account</v-icon></v-btn></a
      >
      <a
        v-if="$store.state.user"
        href="/app/settings"
        style="text-decoration: none"
        ><v-btn icon color="#A82465"><v-icon> mdi-cog</v-icon></v-btn></a
      >
      <a v-if="$store.state.user" style="text-decoration: none"
        ><v-btn @click="$fire.auth.signOut()" icon color="#A82465"
          ><v-icon> mdi-logout</v-icon></v-btn
        ></a
      >

      <a
        v-if="!$store.state.user"
        href="/auth/login"
        style="text-decoration: none"
        class="mr-1"
        ><v-btn style="width: 80px" outlined color="#A82465">Sign-In</v-btn></a
      >
      <a
        v-if="!$store.state.user"
        href="/auth/register"
        style="text-decoration: none"
        ><v-btn style="width: 80px" outlined color="#A82465">Sign-Up</v-btn></a
      >
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch("plans/bindPlansRef");
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    routeToLogin: () => {},
  },
};
</script>
