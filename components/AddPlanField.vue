<template>
  <v-sheet
    elevation="5"
    rounded
    height="200"
    width="200"
    style="background: url( 'https://media.istockphoto.com/photos/business-analyst-smiling-while-interpreting-financial-reports-showing-picture-id873492646') no-repeat center center;background-size: cover; overflow: hidden"
  >
    <div
      style="height:100%;width:100%;background-color: rgba(255, 255, 255, .8);  
 backdrop-filter: blur(10px);"
      class="d-flex flex-column align-center justify-center container"
    >
      <v-icon style="font-size: 100px;" color="blue">
        mdi-plus
      </v-icon>
    </div>
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
