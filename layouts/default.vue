<template>
  <v-app>
    <div
      v-if="!$store.state.user"
      class="mt-4 d-flex align-center "
      style="width: 100%"
    >
      <v-spacer />
      <NuxtLink to="/auth/login" exact style="text-decoration: none;">
        <v-btn text color="blue-grey">
          Login
        </v-btn>
      </NuxtLink>
      <NuxtLink to="/auth/register" exact style="text-decoration: none;">
        <v-btn text color="blue-grey" class="mr-4">
          Register
        </v-btn>
      </NuxtLink>
    </div>
    <div class="mt-4 d-flex align-center " style="width: 100%">
      <v-spacer />
      <NuxtLink to="/app" exact style="text-decoration: none;">
        <v-btn text color="blue-grey">
          Advanced
        </v-btn>
      </NuxtLink>
    </div>

    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
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
      await this.$store.dispatch("tasks/bindTasksRef");
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    routeToLogin: () => {},
  },
};
</script>
