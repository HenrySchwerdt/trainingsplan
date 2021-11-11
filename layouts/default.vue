<template>
  <v-app>
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
