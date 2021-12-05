import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  user: {},
});

export const mutations = {
  ...vuexfireMutations,
};

export const actions = {
  /**
   * binds the items property to the firestore
   */
  bindRef: firestoreAction(function({ bindFirestoreRef }, userId) {
    return bindFirestoreRef(
      "user",
      this.$fire.firestore.collection("users").doc(userId)
    );
  }),
  /**
   * unbinds the items property to the firestore
   */
  unbindRef: firestoreAction(function({ unbindFirestoreRef }) {
    unbindFirestoreRef("users", false);
  }),
  updateProgress: firestoreAction(async function(
    _firestoreObject,
    { userId, data }
  ) {
    const ref = this.$fire.firestore.collection("plans").doc(userId);

    await ref.update(data);
  }),
};

export const getters = {
  getUser: (state) => {
    return state.user;
  },
};
