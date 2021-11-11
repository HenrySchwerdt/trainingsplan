<template>
  <v-sheet
    :width="width"
    :height="height"
    elevation="2"
    :style="
      'width: 100px; height: 100px; font-weight: bold; background:' +
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
      type: String,
      default: "100",
    },
    height: {
      type: String,
      default: "100",
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
