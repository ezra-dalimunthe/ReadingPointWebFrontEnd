export const ACTION_LOGIN = "ACTION_LOGIN";
export const ACTION_LOGOUT = "ACTION_LOGOUT";
export const SUCCESS_LOGGEDIN = "success_loggedin";
export const SUCCESS_LOGGEDOUT = "success_loggedout";

const state = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("userData") || "{}"),
};

const getters = {
  isAuthenticated: (state) => state.token !== null,
  user: (state) => state.user,
};
const actions = {
  [ACTION_LOGIN]: ({ commit }, params) => {
    return new Promise((resolve) => {
      localStorage.setItem("userData", JSON.stringify(params.user));
      localStorage.setItem("token", params.authorisation.token);
      commit(SUCCESS_LOGGEDIN, params);
      resolve();
    });
  },
  [ACTION_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      commit(SUCCESS_LOGGEDOUT);
      resolve();
    });
  },
};
const mutations = {
  [SUCCESS_LOGGEDIN]: (state, params) => {
    state.token = params.token;
    state.user = params.user;
  },
  [SUCCESS_LOGGEDOUT]: (state) => {
    state.token = null;
    state.user = {};
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
