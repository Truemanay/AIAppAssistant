import _ from "lodash";
import { tAppState } from "./types";

const kDefaultAppState: tAppState = {
  rCurrentScreen: "home screen",
  rFinalMessage: "",
  rFocusName: false,
  rFocusPassword: false,
  rIsThinking: false,
  rLoggedIn: false,
  rName: "",
  rPassword: "",
  rStartAnimation: false,
  rStartX: 300,
  rStartY: 300,
};

export const getDefaultAppState = (): tAppState => _.cloneDeep<tAppState>(kDefaultAppState);
