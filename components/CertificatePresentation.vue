<template>
  <div style="height: 400px; width:300px" @click="changeFront">
    <vue-flip
      horizontal
      height="65"
      width="65"
      transition="1s"
      v-model="flipped"
      active-click
    >
      <template v-slot:front>
        <v-sheet
          elevation="5"
          rounded
          v-if="front"
          height="350"
          width="300"
          style="overflow: hidden"
        >
          <div
            style="background: url( 'https://media.istockphoto.com/photos/business-analyst-smiling-while-interpreting-financial-reports-showing-picture-id873492646') no-repeat center center;background-size: cover; height: 170px; width: 100%; box-shadow: inset 0 0 100px #000000;"
            class="d-flex justify-space-between algin-center pa-2"
          >
            <div style="color: white; font-weight: bold">{{ provider }}</div>
            <v-chip
              label
              pill
              outlined
              :color="
                seniority == 'all' || seniority == 'Basic'
                  ? 'green'
                  : seniority == 'Advanced'
                  ? 'yellow'
                  : 'red'
              "
            >
              {{ seniority.toUpperCase() }}
            </v-chip>
          </div>
          <div
            class="elevation-5 d-flex flex-column justify-space-between align-start"
            style="height:180px;width:100%;   padding: 5px 5px 0 5px"
          >
            <div class="text-subtitle-1 primary--text">
              <span v-if="abbreviation != ''" style="font-weight: bold;"
                >{{ abbreviation }}:</span
              >{{ training }}
              <v-divider inset />
              <div v-if="url != ''" class="text-caption" style="color: black">
                <span style="font-weight: bold">at:</span>
                <span v-if="validURL(url)"
                  ><a :href="url">Check their page</a></span
                ><span v-else>{{ url }}</span>
              </div>
              <v-chip
                v-for="(chip, idx) in tags
                  .split(';')
                  .filter((x) => x.length < 20)"
                :key="idx"
                class="ma-2"
                x-small
                label
                pill
                outlined
                color="green"
              >
                {{ chip.toUpperCase() }}
              </v-chip>
            </div>

            <div
              class="d-flex justify-space-between flex-row"
              style="width: 100%; heigth: 100%"
            >
              <div></div>
              <div class="text-caption" v-if="duration != ''">
                duration: <span style="font-weight: bold">{{ duration }}h</span>
              </div>
            </div>
          </div>
        </v-sheet>
      </template>
      <template v-slot:back>
        <v-sheet
          v-if="!front"
          rounded
          elevation="5"
          height="350"
          width="300"
          style="padding: 8px; overflow: scroll"
        >
          <div class="text-overline-2">Description:</div>
          <v-divider inset />
          <div class="text-caption">{{ description }}</div>
        </v-sheet>
      </template>
    </vue-flip>
  </div>
</template>

<script>
import VueFlip from "vue-flip";
export default {
  props: {
    type: {
      type: String,
      default: "N.A.",
    },
    area: {
      type: String,
      default: "N.A.",
    },
    training: {
      type: String,
      default: "N.A.",
    },
    recommended: {
      type: String,
      default: "N.A.",
    },
    abbreviation: {
      type: String,
      default: "N.A.",
    },
    seniority: {
      type: String,
      default: "N.A.",
    },
    duration: {
      type: String,
      default: "N.A.",
    },
    provider: {
      type: String,
      default: "N.A.",
    },
    tags: {
      type: String,
      default: "N.A.",
    },
    description: {
      type: String,
      default: "N.A.",
    },
    url: {
      type: String,
      default: "N.A.",
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
    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
  },
};
</script>

<style></style>
