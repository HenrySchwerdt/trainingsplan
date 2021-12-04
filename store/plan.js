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
          .orderBy("priority", "asc")
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
  updateProgress: firestoreAction(async function(
    { state },
    { planId, trainingId, progress }
  ) {
    const ref = this.$fire.firestore.collection("plans").doc(planId);
    const batch = this.$fire.firestore.batch();

    const totalPercent =
      state.trainings
        .map((x) => {
          return x.id == trainingId ? progress : x.progress;
        })
        .reduce((a, b) => a + b) / state.trainings.length;

    batch.update(ref, {
      percentange: totalPercent,
    });

    const itemRef = this.$fire.firestore
      .collection("plans")
      .doc(planId)
      .collection("trainings")
      .doc(trainingId);
    batch.update(itemRef, {
      progress: progress,
    });
    await batch.commit();
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
