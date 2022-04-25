import { Model } from "../model";

import barcodesA from "../../input/barcodesA.csv";
import barcodesB from "../../input/barcodesB.csv";
import catalogA from "../../input/catalogA.csv";
import catalogB from "../../input/catalogB.csv";
import suppliersA from "../../input/suppliersA.csv";
import suppliersB from "../../input/suppliersB.csv";
import expectedResult from "../../input/result_output.csv";

export const actions = {
  LOAD_DATA: function ({ commit }) {
    Model.data = {
      input: {
        barcodesA,
        barcodesB,
        catalogA,
        catalogB,
        suppliersA,
        suppliersB,
      },
      expected: expectedResult,
    };

    commit("SET_DATA_READY");
  },
};
