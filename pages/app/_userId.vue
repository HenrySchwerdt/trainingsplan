<template>
  <div style="margin-top:-25px;">
    <v-row class="mt-12" justify="center" align="center">
      <v-col cols="8">
        <div
          v-if="this.$route.params.userId == this.$fire.auth.currentUser.uid"
          class="text-h4 mb-2"
        >
          My trainings path
        </div>
        <div v-else class="text-h4 mb-2">
          's trainings path
          <!-- TODO change this -->
        </div>
        <v-divider inset></v-divider>
        <br />
        <div class="text-overline">
          In progress plans:
        </div>
        <br />
        <div
          style="display: grid;grid-template-columns: repeat(auto-fill, 150px);justify-content: space-between;grid-gap: 15px;width: 100%"
        >
          <add-plan-field />
          <div
            v-for="(plan, id) in plans.filter((x) => x.percentange < 100)"
            :key="id"
          >
            <training-plan-link
              :trainingPlanId="plan.id"
              :userName="plan['created_by_name']"
              :trainingPlanName="plan.title"
              :percentage="plan.percentange"
              :createdAt="plan.created_at"
            />
          </div>
        </div>
        <br />
        <br />
        <v-divider></v-divider>
        <br />
        <div class="text-overline">
          Completed plans:
        </div>
        <br />
        <div
          style="display: grid;grid-template-columns: repeat(auto-fill, 150px);justify-content: space-between;grid-gap: 15px;width: 100%"
        >
          <div
            v-for="(plan, id) in plans.filter((x) => x.percentange >= 100)"
            :key="id"
          >
            <training-plan-link
              :trainingPlanId="plan.id"
              :userName="plan['created_by_name']"
              :trainingPlanName="plan.title"
              :percentage="plan.percentange"
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
import AddPlanField from "~/components/AddPlanField.vue";
export default {
  components: { AddPlanField },
  computed: {
    plans: {
      get() {
        return this.$store.getters["plans/getIndividualPlans"](
          this.$route.params.userId
          //this.$fire.auth.currentUser.uid
        );
      },
    },
  },
  methods: {},
};
</script>
