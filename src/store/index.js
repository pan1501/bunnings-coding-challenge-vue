import { createStore } from "vuex";
import { state } from "./vuex/state";
import { getters } from "./vuex/getters";
import { mutations } from "./vuex/mutations";
import { actions } from "./vuex/actions";

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
