<template>
  <div>
    <v-sheet
      v-if="
        this.$fire.auth.currentUser &&
          this.$route.params.userId == this.$fire.auth.currentUser.uid
      "
      elevation="3"
      rounded
      style="position: absolute;right:10px"
      width="200"
      class="pa-2 d-none d-lg-block d-xl-block"
    >
      <div class="text-overline primary--text"><b>Followed:</b></div>
      <v-divider></v-divider>
      <div v-if="follows.length > 0">
        <followed-card
          v-for="(plan, idx) in follows"
          :key="idx"
          :plan="findFollowByPlanId(plan.planId)"
        >
        </followed-card>
      </div>
      <div class="text-caption text-center pt-1" v-else>
        This is empty...
      </div>
    </v-sheet>
    <v-row class="mt-12" justify="center" align="center">
      <v-col cols="8">
        <div
          v-if="
            this.$fire.auth.currentUser &&
              this.$route.params.userId == this.$fire.auth.currentUser.uid
          "
          class="text-h4 mb-2"
        >
          My trainings path
        </div>
        <div v-else-if="currentUser" class="text-h4 mb-2">
          <span class="primary--text">{{ currentUser.userName }}</span
          >'s trainings path
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
  async mounted() {
    try {
      this.$fire.auth.currentUser &&
        this.$fire.auth.currentUser.uid &&
        (await this.$store.dispatch("loggedInUser/bindRef"));
      await this.$store.dispatch(
        "lookedAtUser/bindRef",
        this.$route.params.userId
      );
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    findFollowByPlanId(planId) {
      return this.allPlans.find((x) => x.id == planId);
    },
  },
  computed: {
    plans: {
      get() {
        return this.$store.getters["plans/getIndividualPlans"](
          this.$route.params.userId
          //this.$fire.auth.currentUser.uid
        );
      },
    },
    currentUser: {
      get() {
        return this.$store.getters["lookedAtUser/getUser"];
      },
    },
    allPlans: {
      get() {
        return this.$store.getters["plans/getAllPlans"];
      },
    },
    follows: {
      get() {
        return this.$store.getters["loggedInUser/getFollows"];
      },
    },
  },
};
</script>
