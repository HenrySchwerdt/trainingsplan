<template>
  <div style="width: 80%">
    <div v-if="!$store.state.user">
      You're not logged in.
    </div>
    <div v-else style="width: 100%">
      <v-text-field
        @keyup.enter="generatePlan"
        v-model="planName"
        label="Regular"
        clearable
        solo
      ></v-text-field>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    planName: "",
  }),
  methods: {
    ...mapActions({
      addPlan: "plans/add",
    }),
    generatePlan() {
      this.addPlan(this.planName);
      this.planName = "";
    },
  },
};
</script>
