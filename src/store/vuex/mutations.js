import { Model } from "../model";

export const mutations = {
  SET_DATA_READY: (state) => {
    state.data.output = Model.getOutputData();
    state.data.expected = Model.getExpectedData();
    state.dataReady = true;
  },
};
