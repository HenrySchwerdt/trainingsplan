<template>
  <a
    v-if="plan"
    style="text-decoration: none;"
    :href="'/app/trainingsplan/' + plan.id"
  >
    <v-sheet elevation="2" rounded class="mb-1 mt-1">
      <v-progress-linear
        :value="plan.percentange"
        height="4"
      ></v-progress-linear>
      <div class="pl-1 pr-1">
        <div class="text-caption" style="height: 14px">
          <a
            :href="'/app/' + plan.created_by"
            style="text-decoration: none;font-size:8px; line-height: 4px;margin:0;padding:0"
            ><b>@{{ plan.created_by_name }}</b></a
          >
        </div>
        <div class="text-subtitle-2">
          {{ plan.title }}
        </div>
      </div>
    </v-sheet>
  </a>
</template>
<script>
export default {
  props: {
    plan: {},
  },
};
</script>
<style></style>
