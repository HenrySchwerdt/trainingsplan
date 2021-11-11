<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line v-if="training">
      <div v-if="training.provider" class="text-overline mb-4">
        {{ training.provider }}
      </div>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <TrainingDraggable
                :width="100"
                :height="100"
                :id="id"
                :title="training.abbreviation"
                :type="training.type"
              ></TrainingDraggable>
            </v-col>
            <v-col>
              <div class="text-overline mb-4">
                Description:
              </div>
              <div>{{ training.description }}</div>
              <v-row>
                <v-col></v-col>
                <v-col></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          ><div v-if="validURL(training.URL)">
            <a :href="training.URL">Check on the Provider Page</a>
          </div>
          <div v-else>{{ training.URL }}</div></v-col
        >
      </v-row>
    </v-list-item>
  </v-card>
</template>

<script>
import TrainingDraggable from "./trainingsPlanSelector/TrainingDraggable.vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    getCertificatebyId(id) {
      const index = this.certificatesID.indexOf(id);
      return this.certificates[index];
    },
    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
  },
  computed: {
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
    training() {
      return this.getCertificatebyId(this.id);
    },
  },
  components: { TrainingDraggable },
};
</script>

<style></style>
