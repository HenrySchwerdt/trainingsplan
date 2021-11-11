<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-sheet>
          <div class="text-h4" v-if="plan && plan.title">{{ plan.title }}</div>
          <div class="text-caption" v-if="plan && plan.created_by_name">
            <b>by: </b>{{ plan.created_by_name }}
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="7">
        <v-row>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
      </v-col>
      <v-col cols="5"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async mounted() {
    try {
      await this.$store.dispatch("plan/bindRef", this.$route.params.id);
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    plan: {
      get() {
        return this.$store.getters["plan/getPlan"];
      },
    },
    trainings: {
      get() {
        return this.$store.getters["plan/getTrainings"];
      },
    },
    cercertificates: {
      get() {
        return this.$store.getters["certificates/get"];
      },
    },
  },
};
</script>

<style></style>
