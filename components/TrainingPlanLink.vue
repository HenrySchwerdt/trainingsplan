<template>
  <div
    style="height: 200px; width:200px"
    @click="$router.push('/app/trainingsplan/' + trainingPlanId)"
  >
    <vue-flip
      horizontal
      height="65"
      width="65"
      transition="1s"
      v-model="flipped"
      active-hover
    >
      <template v-slot:front>
        <v-sheet
          elevation="5"
          rounded
          v-if="front"
          height="200"
          width="200"
          style="background: url( 'https://media.istockphoto.com/photos/business-analyst-smiling-while-interpreting-financial-reports-showing-picture-id873492646') no-repeat center center;background-size: cover;padding-top:125px; overflow: hidden"
        >
          <div
            v-if="front"
            class="rounded-t-lg elevation-5"
            style="height:75px;width:100%;background-color: rgba(255, 255, 255, .8);  
 backdrop-filter: blur(10px); padding: 5px"
          >
            <div class="text-h6 primary--text">
              {{ trainingPlanName }}
            </div>
            <div class="text-caption primary--text">
              by <span>{{ userName }}</span>
            </div>
          </div>
        </v-sheet>
      </template>
      <template v-slot:back>
        <v-sheet
          v-if="!front"
          rounded
          elevation="5"
          height="200"
          width="200"
          class="d-flex flex-column justify-center align-center"
          style="text-align: center"
        >
          <v-progress-circular
            :size="150"
            :width="15"
            :value="90"
            color="teal"
            :rotate="-90"
          >
            {{ 90 }}%
          </v-progress-circular></v-sheet
        >
      </template>
    </vue-flip>
  </div>
</template>

<script>
import VueFlip from "vue-flip";
export default {
  props: {
    trainingPlanId: {
      type: String,
      default: "Test",
    },
    userName: {
      type: String,
      default: "TestUser",
    },
    trainingPlanName: {
      type: String,
      default: "BA Tests",
    },
    percentage: {
      type: Number,
      default: 0.8,
    },
    createdAt: {
      default: "8.8.21",
    },
    size: {
      default: 100,
    },
  },
  data: () => ({
    flipped: false,
    front: true,
  }),
  components: {
    "vue-flip": VueFlip,
  },
  methods: {
    changeFront() {
      setTimeout(() => {
        this.front = !this.front;
      }, 300);
    },
  },
};
</script>
