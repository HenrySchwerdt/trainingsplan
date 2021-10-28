<template>
  <div>
    <div>{{ $store.state.user.displayName }}</div>
    <v-row class="mt-12" justify="center" align="center">
      <v-col cols="8">
        <add-plan-field />
        <br />
        <br />
        <div
          style="display: grid;grid-template-columns: repeat(auto-fill, 200px);justify-content: space-between;grid-gap: 20px;width: 100%"
        >
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
        return this.$store.getters["plans/getIndividualPlans"](
          this.$fire.auth.currentUser.uid
        );
      },
    },
  },
  methods: {},
};
</script>
