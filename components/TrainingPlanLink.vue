<template>
  <div
    style="height: 150px; width:150px; cursor: pointer;"
    @click="$router.push('/app/trainingsplan/' + trainingPlanId)"
  >
    <v-sheet
      elevation="5"
      rounded
      height="150"
      width="150"
      :color="this.percentage >= 100 ? '#200A58' : '#A82465'"
      class="d-flex justify-center align-center"
      style="width: 100%; height: 100%;overflow:hidden"
    >
      <div style="width: 100%; height: 100%;" v-if="this.percentage < 100">
        <apexchart
          width="100%"
          height="100%"
          type="donut"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
      <div
        class="d-flex justify-center align-center"
        style="width: 100%; height: 100%;"
        v-else
      >
        <v-icon color="#5f4c8f" style="font-size:280px">
          mdi-check-bold
        </v-icon>
      </div>
      <div style="position: absolute;">
        <div class="text-h5" style="color:white">
          {{ trainingPlanName }}
        </div>
        <div class="text-caption" style="color:white">
          by <span>{{ userName }}</span>
        </div>
      </div>
    </v-sheet>
  </div>
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
      default: 20,
    },
    createdAt: {
      default: "8.8.21",
    },
    size: {
      default: 100,
    },
  },
  computed: {
    series() {
      return [this.percentage, 100 - this.percentage];
    },
    options() {
      const options = {
        plotOptions: {
          pie: {
            customScale: 1,
            donut: {
              size: "0%",
            },
          },
        },
        fill: {
          colors:
            this.percentage >= 100
              ? ["#200A58", "#200A58"]
              : ["#A82465", "#b3668d"],
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          enabled: false,
        },
        subtitle: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        stroke: {
          show: false,
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          hover: {
            filter: {
              type: "none",
              value: 0.15,
            },
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "none",
              value: 0.35,
            },
          },
        },
      };
      return options;
    },
  },
};
</script>
