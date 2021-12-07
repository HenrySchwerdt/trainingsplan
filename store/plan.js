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

  forkPlan: firestoreAction(async function(
    _firestoreObject,
    { ref, trainings, plan }
  ) {
    if (this.$fire.auth.currentUser) {
      await ref.set({
        title: plan.title,
        created_by: this.$fire.auth.currentUser.uid,
        due_date: plan.due_date,
        percentange: 0,
        created_by_name: this.$fire.auth.currentUser.displayName,
        created_at: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      });
      const batch = this.$fire.firestore.batch();
      const collectionRef = this.$fire.firestore
        .collection("plans")
        .doc(ref.id)
        .collection("trainings");
      for (const { certificate_id, priority } of trainings) {
        const itemRef = collectionRef.doc();
        batch.set(itemRef, {
          certificate_id: certificate_id,
          progress: 0,
          priority: priority,
        });
      }
      await batch.commit();
    }
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
