import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  comments: [],
});

export const mutations = {
  ...vuexfireMutations,
};

export const actions = {
  /**
   * binds the items property to the firestore
   */
  bindRef: firestoreAction(function({ bindFirestoreRef }, planId) {
    return bindFirestoreRef(
      "comments",
      this.$fire.firestore
        .collection("plans")
        .doc(planId)
        .collection("comments")
        .orderBy("created_at", "desc")
    );
  }),

  /**
   * unbinds the items property to the firestore
   */
  unbindRef: firestoreAction(function({ unbindFirestoreRef }) {
    unbindFirestoreRef("comments", false);
  }),
  add: firestoreAction(async function(
    _firestoreObject,
    { planId, userId, userName, comment }
  ) {
    this.$fire.firestore
      .collection("plans")
      .doc(planId)
      .collection("comments")
      .doc()
      .set({
        created_by: userId,
        comment: comment,
        created_at: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        created_by_name: userName,
      });
  }),
};

export const getters = {
  get: (state) => {
    return state.comments;
  },
};
