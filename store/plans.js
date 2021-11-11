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
  add: firestoreAction(async function(
    _firestoreObject,
    { ref, title, due_date, items }
  ) {
    if (
      this.$fire.auth.currentUser &&
      title &&
      due_date &&
      items &&
      title.length > 0 &&
      title.length < 50
    ) {
      const batch = this.$fire.firestore.batch();

      batch.set(ref, {
        title: title,
        created_by: this.$fire.auth.currentUser.uid,
        due_date: due_date,
        created_by_name: this.$fire.auth.currentUser.displayName,
        created_at: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      });
      const collectionRef = this.$fire.firestore
        .collection("plans")
        .doc(ref.id)
        .collection("trainings");
      for (const { id, priority } of items) {
        const itemRef = collectionRef.doc();
        batch.set(itemRef, {
          certificate_id: id,
          progress: 0,
          priority: priority,
        });
      }
      await batch.commit();
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
