<template>
  <v-row>
    <v-col cols="12" class="d-flex flex-row justify-start align-center">
      <div v-for="index in itemAmount" :key="index" class="mr-8">
        <div
          style="width: 100px;height:100px"
          @drop="onDrop($event, index)"
          @dragenter.prevent
          @dragover.prevent
          @dragstart="dragStart($event, items[index])"
        >
          <div v-if="items[index]">
            <TrainingDraggable
              :draggable="true"
              :id="items[index]"
              :title="
                certificates[certificatesID.indexOf(items[index])].display_name
              "
              :training="certificates[certificatesID.indexOf(items[index])]"
              :type="certificates[certificatesID.indexOf(items[index])].type"
            ></TrainingDraggable>
          </div>
          <div v-else>
            <TrainingDropZone :id="index"></TrainingDropZone>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12"><v-divider></v-divider></v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="5">
          <v-text-field
            label="Search..."
            solo
            prepend-inner-icon="mdi-magnify"
            v-model="search.searchText"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="search.filter"
            :items="search.filterItems"
            solo
            label="Filter"
            prefix="Type: "
          ></v-select>
        </v-col>
        <v-col cols="12">
          <div @drop="onDelete($event)" @dragenter.prevent @dragover.prevent>
            <v-slide-group>
              <v-slide-item
                v-for="(item, idx) in filteredCertificates()"
                :key="idx"
              >
                <div draggable @dragstart="dragStart($event, item.id)">
                  <TrainingDraggable
                    class="ma-3"
                    :id="item.id"
                    :title="item.display_name"
                    :training="item"
                    :type="item.type"
                  ></TrainingDraggable>
                </div>
              </v-slide-item>
            </v-slide-group>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};
import TrainingDropZone from "./TrainingDropZone.vue";
import TrainingDraggable from "./TrainingDraggable.vue";
export default {
  data: () => ({
    itemAmount: 4,
    items: { 1: undefined, 2: undefined, 3: undefined, 4: undefined },
    search: {
      filterItems: ["all", "Knowlegde", "Course", "Certificate", "Soft Skills"],
      filter: "all",
      searchText: "",
    },
  }),
  methods: {
    selectedIDs() {
      let arr = [];
      for (let id of Object.values(this.items)) {
        let index = this.certificatesID.indexOf(id);
        if (index >= 0) {
          arr.push(index);
        }
      }
      return arr;
    },
    filteredCertificates() {
      return this.certificates
        .filter(
          (x) => !this.selectedIDs().includes(this.certificates.indexOf(x))
        )
        .filter(
          (x) =>
            x.training
              .toLowerCase()
              .includes(this.search.searchText.toLowerCase()) ||
            x.display_name
              .toLowerCase()
              .includes(this.search.searchText.toLowerCase())
        )
        .filter((x) =>
          this.search.filter == "all" ? true : x.type == this.search.filter
        );
    },
    dragStart(event, id) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllow = "move";
      event.dataTransfer.setData("itemID", id);
    },
    onDrop(event, prio) {
      const itemID = event.dataTransfer.getData("itemID");
      for (let index in this.items) {
        if (this.items[index] == itemID) {
          this.items[index] = this.items[prio];
        }
      }
      this.items[prio] = itemID;
      this.$emit("itemsChanged", this.items);
    },
    onDelete(event) {
      const itemID = event.dataTransfer.getData("itemID");
      for (let index in this.items) {
        if (this.items[index] == itemID) {
          this.items[index] = undefined;
        }
      }
      this.$emit("itemsChanged", this.items);
    },
  },
  async mounted() {
    await this.$store.dispatch("certificates/bindCertificatesRef");
  },
  computed: {
    certificates: {
      get() {
        return this.$store.getters["certificates/get"];
      },
    },
    certificatesID: {
      get() {
        return this.$store.getters["certificates/get"].map((x) => x.id);
      },
    },
  },
  components: { TrainingDropZone, TrainingDraggable },
};
</script>

<style></style>
