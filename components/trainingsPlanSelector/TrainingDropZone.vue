<template>
  <v-sheet
    width="100"
    height="100"
    class="d-flex felx-column justify-center align-center"
    style="background: #E4E4E5; font-size: 5vw; color:white;margin:0;padding:0"
  >
    {{ id }}
  </v-sheet>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style></style>
