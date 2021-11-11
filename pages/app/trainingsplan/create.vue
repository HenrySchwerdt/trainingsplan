<template>
  <v-container>
    <v-row dense class="mt-12">
      <v-col cols="12">
        <v-alert
          v-model="errors.planName"
          dense
          border="left"
          type="error"
          dismissible
        >
          The trainingsplan name must at least have
          <strong>4</strong> characters and can have a maximum of
          <strong>50</strong> characters.
        </v-alert>
        <v-alert
          v-model="errors.itemsSelected"
          dense
          border="left"
          type="error"
          dismissible
        >
          You should at least select <strong>one</strong> task for your
          trainingsplan.
        </v-alert>
      </v-col>
      <v-col cols="8">
        <v-text-field
          prefix="[Trainingsplan Title]"
          solo
          v-model="trainingsPlan.title"
        ></v-text-field
      ></v-col>
      <v-col cols="5">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          :nudge-top="80"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="trainingsPlan.due_date"
              prefix="[Due Date]"
              readonly
              solo
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="trainingsPlan.due_date"
            @input="menu = false"
          ></v-date-picker> </v-menu
      ></v-col>
      <v-col cols="12">
        <TrainingsPlanSelectorContainer @itemsChanged="changeItems" />
      </v-col>
      <v-col cols="1" offset="11" class="mt-16">
        <v-btn color="primary" @click="store">Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TrainingsPlanSelectorContainer from "~/components/trainingsPlanSelector/TrainingsPlanSelectorContainer.vue";
export default {
  data: () => ({
    menu: false,
    trainingsPlan: {
      title: "",
      due_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      items: {},
    },
    errors: {
      itemsSelected: false,
      planName: false,
    },
  }),
  methods: {
    changeItems(items) {
      this.trainingsPlan.items = items;
    },
    store() {
      if (!this.checkParameters()) {
        const trainingsPlanRef = this.$fire.firestore.collection("plans").doc();
        this.$store.dispatch("plans/add", {
          ref: trainingsPlanRef,
          title: this.trainingsPlan.title,
          due_date: this.trainingsPlan.due_date,
          items: this.orderItems(this.trainingsPlan.items),
        });
      }
    },
    orderItems(items) {
      const arr = [];
      for (const id of Object.values(items)) {
        if (id && id != "" && this.certificatesID.includes(id)) {
          arr.push({ id: id, priority: arr.length + 1 });
        }
      }
      return arr;
    },
    checkParameters() {
      this.errors.itemsSelected = !Object.values(this.trainingsPlan.items).some(
        (x) => x && x != ""
      );
      this.errors.planName = !(
        this.trainingsPlan.title &&
        this.trainingsPlan.title.length > 4 &&
        this.trainingsPlan.title.length <= 40
      );
      return this.errors.itemsSelected || this.errors.planName;
    },
  },
  computed: {
    certificatesID: {
      get() {
        return this.$store.getters["certificates/get"].map((x) => x.id);
      },
    },
  },
  components: {
    TrainingsPlanSelectorContainer,
  },
};
</script>

<style></style>
