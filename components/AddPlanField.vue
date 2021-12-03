<template>
  <v-sheet
    elevation="5"
    rounded
    height="150"
    width="150"
    class="d-flex flex-column align-center justify-center"
    style="background-color: rgba(199, 199, 199, 0.616);cursor:pointer;"
    @click="$router.push('/app/trainingsplan/create')"
  >
    <v-icon style="font-size: 100px;" color="white">
      mdi-plus
    </v-icon>
  </v-sheet>
</template>
<script>
export default {};
</script>
<style scoped>
.container:hover {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>
