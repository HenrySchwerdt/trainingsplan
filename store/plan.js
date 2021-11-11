import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  trainings: [],
  plan: {},
});

export const mutations = {
  ...vuexfireMutations,
};

export const actions = {
  /**
   * binds the items property to the firestore
   */
  bindRef: firestoreAction(function({ bindFirestoreRef }, planId) {
    return (
      bindFirestoreRef(
        "plan",
        this.$fire.firestore.collection("plans").doc(planId)
      ) &&
      bindFirestoreRef(
        "trainings",
        this.$fire.firestore
          .collection("plans")
          .doc(planId)
          .collection("trainings")
      )
    );
  }),
  /**
   * unbinds the items property to the firestore
   */
  unbindRef: firestoreAction(function({ unbindFirestoreRef }) {
    unbindFirestoreRef("trainings", false);
    unbindFirestoreRef("plan", false);
  }),
};

export const getters = {
  getPlan: (state) => {
    return state.plan;
  },
  getTrainings: (state) => {
    return state.trainings;
  },
};
