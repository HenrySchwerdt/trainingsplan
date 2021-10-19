import { vuexfireMutations } from "vuexfire";
export const state = () => ({
  user: null,
});

export const mutations = {
  ...vuexfireMutations,
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser }) => {
    if (authUser !== null) {
      const { uid, email, emailVerified, displayName } = authUser;
      state.user = { uid, email, emailVerified, displayName };
    } else {
      state.user = null;
    }
  },
};

export const getters = () => ({
  getUser: (state) => {
    return state.user;
  },
});
