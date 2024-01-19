import _ from "lodash";
import { tAppStructureState } from "./types";

const kDefaultAppStructureState: tAppStructureState = {
  screens: [],
};

export const getDefaultAppStructureState = (): tAppStructureState =>
  _.cloneDeep<tAppStructureState>(kDefaultAppStructureState);
