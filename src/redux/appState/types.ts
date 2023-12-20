// /**
//  * Define any reusable types / interfaces here 'types.ts'
//  */
// /** *** */
import { RecursiveReadonly } from "../../util/types";

export type tAppState = {
  rCurrentScreen: string;
  rLoggedIn: boolean;
  rName: string;
  rPassword: string;
  rFocusName: boolean;
  rFocusPassword: boolean;
  rStartAnimation: boolean;
  rStartY: number;
  rStartX: number;
  rIsThinking: boolean;
  rFinalMessage: string;
};

export type tAppStateImmutable = RecursiveReadonly<tAppState>;

export type tSetAppState = {
  type: "SET_APP_STATE";
  rCurrentScreen?: string;
  rLoggedIn?: boolean;
  rName?: string;
  rPassword?: string;
  rFocusName?: boolean;
  rFocusPassword?: boolean;
};
export type tSetAnimState = {
  type: "SET_ANIM_STATE";
  rStartAnimation: boolean;
  rStartY: number;
  rStartX: number;
};
export type tSetThinkingState = {
  type: "SET_THINKING_STATE";
  rIsThinking: boolean;
};
export type tSetFinalMessageState = {
  type: "SET_FINAL_MESSAGE";
  rFinalMessage: string;
};

export type tAppAction = tSetAnimState | tSetAppState | tSetFinalMessageState | tSetThinkingState;
