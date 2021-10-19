<template>
  <div>
    <v-row class="mt-12" justify="center" align="center">
      <v-col class="mt-10" cols="12" sm="1" md="8">
        <div class="d-flex flex-row" style="width: 100%">
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-text-field
            label="Search user or plans"
            append-icon="mdi-magnify"
            color="blue-grey"
          ></v-text-field>
        </div>
        <div
          v-if="plans.length <= 0"
          class="text-caption"
          style="text-align: center; width: 100%"
        >
          No trainingplans found...
        </div>
        <div v-for="(plan, id) in plans" :key="id">
          <training-plan-link
            :trainingPlanId="plan.uid"
            :userName="plan['created_by_name']"
            :trainingPlanName="plan.title"
            :percentage="0.4"
            :createdAt="plan.created_at"
          />
          <br />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  computed: {
    plans: {
      get() {
        return this.$store.getters["plans/getAllPlans"];
      },
    },
  },
  methods: {},
};
</script>
