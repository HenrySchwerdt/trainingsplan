<template>
  <v-container>
    <br /><br /><br />
    <v-row>
      <v-col cols="12">
        <v-sheet>
          <div class="text-h4" v-if="plan && plan.title">{{ plan.title }}</div>
          <div class="text-caption" v-if="plan && plan.created_by_name">
            <b>by: </b>{{ plan.created_by_name }}
          </div>
        </v-sheet>
      </v-col>

      <v-col
        cols="7"
        v-if="
          trainings &&
            trainings.length > 0 &&
            certificatesID &&
            certificatesID.length > 0
        "
      >
        <v-row>
          <v-col cols="12">
            <div
              v-for="(training, idx) in trainings"
              :key="idx"
              class="d-flex flex-row justify-start align-center"
            >
              <TrainingDraggable
                class="mt-3 mb-3"
                :key="idx"
                :id="training.id"
                :height="100"
                :width="150"
                :title="
                  getCertificatebyId(training.certificate_id).abbreviation
                "
                :type="getCertificatebyId(training.certificate_id).type"
              ></TrainingDraggable>
              <div class="ml-4" style="flex:1">
                <div
                  style="border-style: groove; width: 100%; height:50px;padding: 1px"
                >
                  <div
                    :style="
                      'width:' +
                        training.progress +
                        '%; height:100%;background:' +
                        colorCodes[
                          getCertificatebyId(training.certificate_id).type
                        ]
                    "
                  ></div>
                </div>
                <div
                  v-if="$fire.auth.currentUser.uid == plan.created_by"
                  style="height:10px"
                >
                  <v-slider
                    :value="training.progress"
                    style="padding: 0;margin:0;"
                    @change="updateProgress($event, training.id)"
                    step="10"
                    :color="
                      colorCodes[
                        getCertificatebyId(training.certificate_id).type
                      ]
                    "
                    track-color="grey"
                    ticks="always"
                  ></v-slider>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="5"
        v-if="
          trainings &&
            trainings.length > 0 &&
            certificatesID &&
            certificatesID.length > 0
        "
      >
        <apexchart
          width="100%"
          height="100%"
          type="donut"
          :options="options"
          :series="series"
        ></apexchart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TrainingDraggable from "~/components/trainingsPlanSelector/TrainingDraggable.vue";
Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};
export default {
  data: () => ({
    colorCodes: {
      Certificate: "#E31937",
      Course: "#D6A5B1",
      Knowledge: "#5236AB",
      "Soft Skills": "#991F3D",
    },
  }),
  async mounted() {
    try {
      await this.$store.dispatch("plan/bindRef", this.$route.params.id);
      await this.$store.dispatch("certificates/bindCertificatesRef");
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    getCertificatebyId(id) {
      const index = this.certificatesID.indexOf(id);
      return this.certificates[index];
    },
    updateProgress(progress, id) {
      this.$store.dispatch("plan/updateProgress", {
        planId: this.$route.params.id,
        trainingId: id,
        progress: progress,
      });
    },
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
    certificates: {
      get() {
        return this.$store.getters["certificates/get"];
      },
    },
    certificatesID: {
      get() {
        return this.$store.getters["certificates/get"].map((x) => x.id);
      },
    },
    series() {
      const series = [];
      const updatedData = this.trainings.map((x) => {
        const cert = this.getCertificatebyId(x.certificate_id);
        x.type = cert.type;
        return x;
      });
      const groupedData = updatedData.groupBy("type");
      for (const value of Object.values(groupedData)) {
        series.push(
          value.map((x) => x.progress).reduce((a, b) => a + b, 0) /
            (value.length * 100)
        );
      }
      series.push(
        Object.keys(groupedData).length - series.reduce((a, b) => a + b, 0)
      );
      return series;
    },
    options() {
      const updatedData = this.trainings.map((x) => {
        const cert = this.getCertificatebyId(x.certificate_id);
        x.type = cert.type;
        return x;
      });

      const groupedData = updatedData.groupBy("type");
      const colors = [];
      for (const item of Object.keys(groupedData)) {
        colors.push(this.colorCodes[item]);
      }
      colors.push("#ffffff");
      const options = {
        plotOptions: {
          pie: {
            customScale: 0.9,
            donut: {
              size: "40%",
            },
          },
        },
        fill: {
          colors: colors,
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
      };
      return options;
    },
  },
  components: { TrainingDraggable },
};
</script>

<style></style>
