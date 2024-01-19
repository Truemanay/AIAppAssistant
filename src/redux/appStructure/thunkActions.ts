import { tThunkDispatch } from "../types";
import { tAppStructureState } from "./types";

export const setAppStructureObject = (
  state: tAppStructureState,
  screenName: string,
  newActions: string[],
): tThunkDispatch => {
  return (dispatch, _getState) => {
    // Find the screen index
    const screenIndex = state.screens.findIndex((screen) => screen.name === screenName);

    if (screenIndex !== -1) {
      // Screen exists, add new actions if they are not already present
      newActions.forEach((action) => {
        if (!state.screens[screenIndex].actions.includes(action)) {
          state.screens[screenIndex].actions.push(action);
        }
      });
    } else {
      // Screen does not exist, add new screen with actions
      state.screens.push({ actions: newActions, name: screenName });
    }
    dispatch({ screens: state.screens, type: "SET_APP_STRUCTURE" });
    return state;
  };
};
