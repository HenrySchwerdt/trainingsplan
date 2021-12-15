<template>
  <v-card>
    <v-card-title>{{ training }}</v-card-title>
    <v-card-subtitle>
      <b v-if="abbreviation.length > 0">{{ abbreviation }}:</b>
      {{ display_name }}
    </v-card-subtitle>
    <v-divider class="primary"></v-divider>
    <br />
    <v-card-text>
      <div>{{ description }}</div>
      <br />
      <v-divider class="primary"></v-divider>
      <div class="text-caption"><b>Duration:</b> {{ duration }}h</div>
      <div class="text-caption"><b>Provider:</b> {{ provider }}</div>
      <div class="text-caption"><b>Senority:</b> {{ seniority }}</div>
      <div class="text-caption"><b>Type:</b> {{ type }}</div>
      <div class="text-caption"><b>Url:</b> {{ url }}</div>
    </v-card-text>

    <v-card-actions></v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    abbreviation: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    display_name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    seniority: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    training: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
};
</script>
