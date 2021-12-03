<template>
  <v-sheet
    :width="width"
    :height="height"
    :rounded="rounded"
    elevation="2"
    :style="
      'width: ' +
        width +
        'px; height:' +
        height +
        'px; font-weight: bold; background:' +
        colorCodes[type] +
        '; color: white;margin:0;padding:0'
    "
    class="d-flex flex-column align-center justify-center"
  >
    {{ title }}
  </v-sheet>
</template>

<script>
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
    colorCodes: {
      Certificate: "#E31937",
      Course: "#D6A5B1",
      Knowledge: "#5236AB",
      "Soft Skills": "#991F3D",
    },
  }),
};
</script>

<style></style>
