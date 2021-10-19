import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  list: [],
});

export const mutations = {
  ...vuexfireMutations,
};

export const actions = {
  /**
   * Binds the tasks to an array. This makes it listening to liveupdates
   */
  bindTasksRef: firestoreAction(function({ bindFirestoreRef }) {
    return bindFirestoreRef("list", this.$fire.firestore.collection("tasks"));
  }),

  /**
   * Unbinds the todos from the state array. This makes it stop listening to liveupdates
   */
  unbindTasksRef: firestoreAction(function({ unbindFirestoreRef }) {
    unbindFirestoreRef("list", false);
  }),

  /**
   * Adds a todo to the todos document with a creator_id and a list_id
   */
  addTodo: firestoreAction(function(
    { rootState },
    { title, progress, list_id }
  ) {
    if (rootState.user.uid && title && title !== "") {
      this.$fire.firestore
        .collection("tasks")
        .doc()
        .set({
          is_done: false,
          title,
          list_id,
          progress,
          created_by: rootState.user.uid,
          created_at: this.$fireModule.firestore.FieldValue.serverTimestamp(),
          comments: {},
        });
    }
  }),

  /**
   * Toogels the state of the task from done to un_done.
   */
  toggle: firestoreAction(function({ rootState, state }, ref) {
    if (rootState.user.uid) {
      this.$fire.firestore
        .collection("tasks")
        .doc(ref.id)
        .update({
          is_done: !ref.is_done,
        });
      if (!ref.is_done) {
        state.list
          .filter(
            (x) =>
              x.created_by == this.$fire.auth.currentUser.uid &&
              x.task_id == ref.id
          )
          .forEach((x) =>
            this.$fire.firestore
              .collection("tasks")
              .doc(x.id)
              .update({
                is_done: !ref.is_done,
              })
          );
      }
    }
  }),

  /**
   * Deletes the task form the task document.
   */
  delete: firestoreAction(function({ rootState, state }, ref) {
    if (rootState.user.uid) {
      this.$fire.firestore
        .collection("tasks")
        .doc(ref.id)
        .delete();
      state.list
        .filter(
          (x) =>
            x.created_by == this.$fire.auth.currentUser.uid &&
            x.task_id == ref.id
        )
        .forEach((x) =>
          this.$fire.firestore
            .collection("tasks")
            .doc(x.id)
            .delete()
        );
    }
  }),

  /**
   * Update fields from task in ref.
   */
  update: firestoreAction(function({ rootState }, { ref, payload }) {
    if (rootState.user.uid) {
      this.$fire.firestore
        .collection("todos")
        .doc(ref.id)
        .update(payload);
    }
  }),
};
export const getters = {
  /**
   * returns all todos of user
   */
  getTodos(state) {
    return state.list;
  },
  /**
   * returns all done todos for a given list or nothing if list is not available
   */
  getTodosDoneForList: (state) => (listId) => {
    if (listId == "starred") {
      return state.list.filter((x) => x.is_starred && x.is_done && x.list_id);
    }
    if (listId == "tasks") {
      return state.list.filter((x) => x.is_done && x.list_id);
    }
    return state.list.filter(
      (x) => x.list_id == listId && x.is_done && x.list_id
    );
  },
  /**
   * returns all undone todos for a given list or nothing if list is not available
   */
  getTodosDoingForList: (state) => (listId) => {
    if (listId == "starred") {
      return state.list.filter((x) => x.is_starred && !x.is_done && x.list_id);
    }
    if (listId == "tasks") {
      return state.list.filter((x) => !x.is_done && x.list_id && x.list_id);
    }
    return state.list.filter(
      (x) => x.list_id == listId && !x.is_done && x.list_id
    );
  },
  /**
   * returns all starred tasks
   */
  getStarredItems(state) {
    return state.list.filter((x) => x.is_starred && x.list_id);
  },
  /**
   * returns a task if id is found otherwise returns undefined
   */
  getTaskFromId: (state) => (id) => {
    if (state.list.length > 0) {
      return state.list.find((x) => x.id == id);
    }
    return undefined;
  },
  /**
   * returns all subtasks of a task
   */
  getSubtasksFromTaskId: (state) => (id) => {
    if (state.list.length > 0) {
      return state.list.filter((x) => x.task_id == id);
    }
    return undefined;
  },
};
