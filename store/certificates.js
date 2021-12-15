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
  bindCertificatesRef: firestoreAction(function({ bindFirestoreRef }) {
    return bindFirestoreRef(
      "items",
      this.$fire.firestore.collection("certificates")
    );
  }),
  /**
   * unbinds the items property to the firestore
   */
  unbindCertificatesRef: firestoreAction(function({ unbindFirestoreRef }) {
    unbindFirestoreRef("items", false);
  }),
};

export const getters = {
  get: (state) => {
    return state.items;
  },
  getSpecific: (state) => (id) => {
    return state.items.find((x) => {
      console.log(x.id == id);
      return x.id == id;
    });
  },
};
