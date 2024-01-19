/**
 * As we add new reducers don't forget to add their states here!
 */
import type { Dispatch } from "react";
import { tAppAction, tAppState } from "./appState/types";
import { tAppStructureAction, tAppStructureState } from "./appStructure/types";

/**
 * ReduxDispatch
 * A complete enumeration of all possible Redux Dispatch Actions
 */
export type tDispatchAction =
  | tAppAction
  | tAppStructureAction
  | {
      // Note:  This message will appear from typescript when it can't find a matching "type" key.
      // Added just so it's easier to find why typescript hates you again!  hahaha
      type: "tDispatchAction doesn't have that key in ../redux/index.ts";
    }; // import and add enumeration of actions and thunk actions here i.e. tAction1 | tThunkAction1 | ...

export type tThunkDispatch = (
  dispatch: Dispatch<tDispatchAction | tThunkDispatch>,
  getState: () => tReduxState,
) => void;
/**
 * ReduxState
 * The main type definition for the Redux Store
 */
export interface tReduxState {
  AppReducer: tAppState;
  AppStructureReducer: tAppStructureState;
  _persist: { version: number; rehydrated: boolean };
}

/**
 * Instead of importing our redux state interface
 * in every component that it is used, here we are using
 * module augmentation to extend the default state.
 *
 * See more about module augmentation here:
 *  https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 *
 * Essentially what this is doing is modifying the 'DefaultRootState' export
 * from the react-redux module. Thus, whenever the ts compiler sees 'DefaultRootState'
 * inside of react-redux it uses the type interface below instead of what is
 * exported from the module.
 * (i.e. useSuperSelector calls are typed automatically! no need to import the state type in every file it's used!)
 */
/** *** */

declare module "react-redux" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends tReduxState {}
}
