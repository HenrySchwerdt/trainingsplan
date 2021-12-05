import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  user: {},
  follows: [],
});

export const mutations = {
  ...vuexfireMutations,
};

export const actions = {
  /**
   * binds the items property to the firestore
   */
  bindRef: firestoreAction(function({ bindFirestoreRef }) {
    return (
      bindFirestoreRef(
        "user",
        this.$fire.firestore
          .collection("users")
          .doc(this.$fire.auth.currentUser.uid)
      ) &&
      bindFirestoreRef(
        "follows",
        this.$fire.firestore
          .collection("users")
          .doc(this.$fire.auth.currentUser.uid)
          .collection("follows")
      )
    );
  }),
  /**
   * unbinds the items property to the firestore
   */
  unbindRef: firestoreAction(function({ unbindFirestoreRef }) {
    unbindFirestoreRef("user", false);
  }),

  followPlan: firestoreAction(async function(_firestoreObject, { planId }) {
    await this.$fire.firestore
      .collection("users")
      .doc(this.$fire.auth.currentUser.uid)
      .collection("follows")
      .doc()
      .set({ planId });
  }),

  unfollowPlan: firestoreAction(async function({ state }, { planId }) {
    await this.$fire.firestore
      .collection("users")
      .doc(this.$fire.auth.currentUser.uid)
      .collection("follows")
      .doc(state.follows.find((x) => x.planId == planId).id)
      .delete();
  }),
};

export const getters = {
  getUser: (state) => {
    return state.user;
  },
  getFollows: (state) => {
    return state.follows;
  },
};
