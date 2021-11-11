import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  items: [],
});

export const mutations = {
  ...vuexfireMutations,
};

export const actions = {
  /**
   * binds the items property to the firestore
   */
  bindPlanItemsRef: firestoreAction(function({ bindFirestoreRef }, planId) {
    return bindFirestoreRef(
      "items",
      this.$fire.firestore
        .collection("plans")
        .doc(planId)
        .collection("trainings")
    );
  }),
  /**
   * unbinds the items property to the firestore
   */
  unbindPlanItemsRef: firestoreAction(function({ unbindFirestoreRef }) {
    unbindFirestoreRef("items", false);
  }),

  /**
   * adds a list to a user
   */
  add: firestoreAction(function(
    _firestoreObject,
    { planId, id, progress, name, priority }
  ) {
    if (this.$fire.auth.currentUser && id && progress && name && planId) {
      const trainingRef = this.$fire.firestore
        .collection("plans")
        .doc(planId)
        .collection("trainings")
        .doc();
      trainingRef.add({
        id,
        progress,
        name,
        priority,
      });
    }
  }),

  update: firestoreAction(async function(
    _firestoreObject,
    { planId, trainingId, toUpdate }
  ) {
    await this.$fire.firestore
      .collection("plans")
      .doc(planId)
      .collection("trainings")
      .doc(trainingId)
      .update({
        ...toUpdate,
      });
  }),
  remove: firestoreAction(async function(
    _firestoreObject,
    { planId, trainingId }
  ) {
    await this.$fire.firestore
      .collection("plans")
      .doc(planId)
      .collection("trainings")
      .doc(trainingId)
      .delete();
  }),
};

export const getters = {
  getTrainingsFromPlan: (state) => {
    state.items;
  },
};
