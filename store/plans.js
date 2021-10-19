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
  bindPlansRef: firestoreAction(function({ bindFirestoreRef }) {
    return bindFirestoreRef("items", this.$fire.firestore.collection("plans"));
  }),
  /**
   * unbinds the items property to the firestore
   */
  unbindPlansRef: firestoreAction(function({ unbindFirestoreRef }) {
    unbindFirestoreRef("items", false);
  }),

  /**
   * adds a list to a user
   */
  add: firestoreAction(function(_firestoreObject, planName) {
    if (
      this.$fire.auth.currentUser &&
      planName &&
      planName.length > 0 &&
      planName.length < 50
    ) {
      this.$fire.firestore
        .collection("plans")
        .doc()
        .set({
          title: planName,
          created_by: this.$fire.auth.currentUser.uid,
          created_at: this.$fireModule.firestore.FieldValue.serverTimestamp(),
          created_by_name: this.$fire.auth.currentUser.displayName,
          comments: {},
        });
    }
  }),
};

export const getters = {
  getAllPlans: (state) => {
    return state.items;
  },
  getIndividualPlans: (state) => (id) => {
    return state.items.filter((x) => x.created_by == id);
  },
};
