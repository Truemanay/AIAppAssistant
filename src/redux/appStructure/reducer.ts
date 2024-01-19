import { produce } from "immer";
import { tAppStructureAction, tAppStructureImmutable, tAppStructureState } from "./types";
import { getDefaultAppStructureState } from "./defaultData";

export const AppStructureReducer = produce(
  (state: tAppStructureState = getDefaultAppStructureState(), action: tAppStructureAction): tAppStructureImmutable => {
    switch (action.type) {
      case "SET_APP_STRUCTURE":
        state.screens = action.screens;
        break;
    }
    return state;
  },
);
