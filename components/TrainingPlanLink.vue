<template>
  <v-sheet elevation="5" height="65" shaped width="100%">
    <div class="d-flex align-center" style="height: 100%">
      <div class="ml-3 mt-1 mb-1" style="height: 100%">
        <div
          class="d-flex flex-column justify-space-between"
          style="height: 100%"
        >
          <div class="text-h6">Trainingsplan: BA</div>
          <div class="text-caption">
            by <span>Heschwerdt</span> | Updated: <span>Heschwerdt</span>
          </div>
        </div>
      </div>
      <v-spacer />
      <div class="mr-4">
        <v-progress-circular
          :value="80"
          color="blue-grey"
        ></v-progress-circular>
      </div>
      <div class="mr-2">
        <v-icon color="blue-grey" large>mdi-chevron-right</v-icon>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: {
    trainingPlanId: {
      type: String,
      default: "Test",
    },
    userName: {
      type: String,
      default: "TestUser",
    },
    trainingPlanName: {
      type: String,
      default: "BA Tests",
    },
    percentage: {
      type: Number,
      default: 0.8,
    },
  },
};
</script>
