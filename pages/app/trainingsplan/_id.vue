<template>
  <v-container>
    <br />
    <v-sheet>
      <div
        class="text-h4 d-flex flex-row align-center"
        v-if="plan && plan.title"
      >
        {{ plan.title }}
        <div v-if="isUsersPage">
          <v-btn
            v-if="follows.find((x) => x.planId == $route.params.id)"
            text
            x-small
            @click="unfollow()"
            color="primary"
            class="ml-2"
            >Unfollow</v-btn
          >
          <v-btn
            v-else
            text
            x-small
            color="primary"
            class="ml-2"
            @click="follow()"
            >Follow</v-btn
          >
        </div>
      </div>
      <div class="text-caption" v-if="plan && plan.created_by_name">
        <a :href="'/app/' + plan.created_by" style="text-decoration: none; "
          ><b>@{{ plan.created_by_name }}</b></a
        >
      </div>
    </v-sheet>

    <v-row>
      <v-col
        cols="12"
        lg="7"
        xl="7"
        v-if="
          trainings &&
            trainings.length > 0 &&
            certificatesID &&
            certificatesID.length > 0
        "
      >
        <v-row>
          <v-col cols="12" style="perspective: 10rem;">
            <v-sheet class="pa-3">
              <v-sheet
                elevation="2"
                rounded
                v-for="(training, idx) in trainings"
                :key="idx"
                class="d-flex flex-row justify-start align-center pl-2 pr-2 ma-2"
              >
                <div>
                  <TrainingDraggable
                    class="mt-3 mb-3"
                    rounded
                    :key="idx"
                    :id="training.id"
                    :height="100"
                    :width="150"
                    :title="
                      getCertificatebyId(training.certificate_id).display_name
                    "
                    :type="getCertificatebyId(training.certificate_id).type"
                  ></TrainingDraggable>
                </div>
                <div class="ml-4" style="flex:1;">
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
                    v-if="
                      $fire.auth.currentUser &&
                        $fire.auth.currentUser.uid == plan.created_by
                    "
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
              </v-sheet>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        class=".d-xs-none"
        cols="12"
        xl="5"
        lg="5"
        v-if="
          trainings &&
            trainings.length > 0 &&
            certificatesID &&
            certificatesID.length > 0
        "
        style="perspective: 10rem;"
      >
        <v-sheet class="pa-1" width="100%" height="100%">
          <apexchart
            width="100%"
            height="100%"
            type="donut"
            :options="options"
            :series="series"
          ></apexchart>
        </v-sheet>
      </v-col>
      <v-col cols="12" order="3">
        <comment-section :planId="this.$route.params.id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommentSection from "~/components/CommentSection.vue";
import TrainingDraggable from "~/components/trainingsPlanSelector/TrainingDraggable.vue";
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
      this.$fire.auth.currentUser &&
        this.$fire.auth.currentUser.uid &&
        (await this.$store.dispatch("loggedInUser/bindRef"));
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
    follow() {
      this.$store.dispatch("loggedInUser/followPlan", {
        planId: this.$route.params.id,
      });
    },
    unfollow() {
      this.$store.dispatch("loggedInUser/unfollowPlan", {
        planId: this.$route.params.id,
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
    follows: {
      get() {
        return this.$store.getters["loggedInUser/getFollows"];
      },
    },
    series() {
      const series = this.trainings.map((x) => x.progress);

      series.push(
        100 * this.trainings.length - series.reduce((a, b) => a + b, 0)
      );
      return series;
    },
    options() {
      const updatedData = this.trainings.map((x) => {
        const cert = this.getCertificatebyId(x.certificate_id);
        x.type = cert.type;
        return x;
      });

      const colors = updatedData.map((x) => this.colorCodes[x.type]);

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
        markers: {
          enabled: false,
        },
        subtitle: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
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
    isUsersPage: {
      get() {
        return (
          this.$fire.auth.currentUser &&
          this.$fire.auth.currentUser.uid == this.plan.created_by
        );
      },
    },
  },
  components: { TrainingDraggable, CommentSection },
};
</script>

<style></style>
