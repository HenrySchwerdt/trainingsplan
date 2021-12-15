<template>
  <v-sheet
    :width="width"
    :height="height"
    :rounded="rounded"
    style="cursor: pointer;"
    @click="isShowing = !isShowing"
    elevation="2"
    :style="
      'width: ' +
        width +
        'px; height:' +
        height +
        'px; font-weight: bold; background:' +
        colorCodes[type] +
        '; color: white;margin:0;padding:0;white-space: wrap;display:block;word-wrap: break-word; white-space:normal;'
    "
    class="text-center"
  >
    <v-dialog v-model="isShowing" width="500">
      <CertificatePopup v-bind="training" />
    </v-dialog>
    <div style="position: relative;top:50%;transform:translateY(-50%)">
      {{ title }}
    </div>
  </v-sheet>
</template>

<script>
import CertificatePopup from "../CertificatePopup.vue";
export default {
  name: "TrainingDraggable",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    training: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isShowing: false,
    colorCodes: {
      Certificate: "#E31937",
      Course: "#D6A5B1",
      Knowledge: "#5236AB",
      "Soft Skills": "#991F3D",
    },
  }),

  components: {
    CertificatePopup,
  },
};
</script>

<style></style>
