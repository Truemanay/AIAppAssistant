import { produce } from "immer";
import { tAppAction, tAppState, tAppStateImmutable } from "./types";
import { getDefaultAppState } from "./defaultData";

export const AppReducer = produce((state: tAppState = getDefaultAppState(), action: tAppAction): tAppStateImmutable => {
  switch (action.type) {
    case "SET_APP_STATE":
      if (action.rCurrentScreen !== undefined) state.rCurrentScreen = action.rCurrentScreen;
      if (action.rLoggedIn !== undefined) state.rLoggedIn = action.rLoggedIn;
      if (action.rName !== undefined) state.rName = action.rName;
      if (action.rPassword !== undefined) state.rPassword = action.rPassword;
      if (action.rFocusName !== undefined) state.rFocusName = action.rFocusName;
      if (action.rFocusPassword !== undefined) state.rFocusPassword = action.rFocusPassword;
      break;
    case "SET_ANIM_STATE":
      state.rStartAnimation = action.rStartAnimation;
      state.rStartX = action.rStartX;
      state.rStartY = action.rStartY;
      break;
    case "SET_THINKING_STATE":
      state.rIsThinking = action.rIsThinking;
      break;
  }
  return state;
});
