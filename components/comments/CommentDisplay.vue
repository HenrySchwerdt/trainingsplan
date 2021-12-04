<template>
  <v-sheet rounded elevation="2" min-height="40" class="pa-2 ma-2">
    <div class="text-caption">
      <a :href="'/app/' + userId" style="text-decoration: none;"
        ><b>@{{ userName }}</b></a
      >
      <b>commented:</b>
    </div>
    <v-divider inset></v-divider>
    <div class="text-caption">{{ comment }}</div>
  </v-sheet>
</template>
<script>
export default {
  props: {
    userName: {
      required: true,
      type: String,
    },
    userId: {
      required: true,
      type: String,
    },
    comment: {
      required: true,
      type: String,
    },
  },
};
</script>
