<template>
  <div>
    <v-row class="mt-12" justify="center" align="center">
      <v-col class="mt-10" cols="12" sm="1" md="8">
        <div class="d-flex flex-row" style="width: 100%">
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-text-field
            label="Search user or plans"
            append-icon="mdi-magnify"
            color="blue-grey"
          ></v-text-field>
        </div>
        <br />
        <training-plan-link />
        <br />
        <training-plan-link />
        <br />
        <training-plan-link />
        <br />
        <training-plan-link />
      </v-col>
    </v-row>
  </div>
</template>
