// /**
//  * Define any reusable types / interfaces here 'types.ts'
//  */
// /** *** */
import { RecursiveReadonly } from "../../util/types";

export type tAppStructureState = {
  screens: Array<{ actions: Array<string>; name: string }>;
};

export type tAppStructureImmutable = RecursiveReadonly<tAppStructureState>;

export type tSetAppStructure = {
  type: "SET_APP_STRUCTURE";
  screens: Array<{ actions: Array<string>; name: string }>;
};

export type tAppStructureAction = tSetAppStructure;
