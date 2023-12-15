/* eslint-disable @typescript-eslint/no-explicit-any */
const kVERBOSE = false;

import _ from "lodash";
// eslint-disable-next-line no-restricted-imports
import { shallowEqual, useSelector } from "react-redux";
import type { tReduxState } from "../redux/types";
// import { shallow } from "enzyme";

export const useSuperSelector: {
  <T>(
    mySelector: (state: tReduxState) => T,
    myType: "infer",
    myEqualityFn?: (prev: tReduxState, next: tReduxState) => boolean,
  ): T;
  <T>(mySelector: (state: tReduxState) => T, myEqualityFn?: (prev: tReduxState, next: tReduxState) => boolean): T;

  // ----------------------- JASON ABOVE THIS LINE ----------------------
  // kyle stuffs things here...

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} = function useSuperSelector(mySelector: any, myType: any = "infer", myEqualityFn?: any): any {
  const aReturn = useSelector(mySelector, myEqualityFn ?? isEqual);
  if (myType !== "infer") {
    if (hasTypeProperty(aReturn)) {
      if (myType === "reading") {
        if (!["mood", "a1c", "glucose", "ketones", "weight"].includes(aReturn.type)) {
          kVERBOSE && console.log(`reading type mismatch useSuperSelector expected ${myType}!`, aReturn.type);
        }
      } else if (aReturn.type !== myType) {
        kVERBOSE && console.log(`type mismatch useSuperSelector expected ${myType}!`, aReturn.type);
      }
    } else {
      kVERBOSE && console.log(`useSuperSelector missing type ${myType}!`, aReturn);
    }
  }
  return aReturn;
};

// export const useSuperSelector: {
//   <T>(
//     mySelector: (state: tReduxState) => T,
//     myType: "infer",
//     myEqualityFn?: (prev: tReduxState, next: tReduxState) => boolean,
//   ): T;
//   (
//     mySelector: (state: tReduxState) => any,
//     myType: "meal",
//     myEqualityFn?: (prev: tReduxState, next: tReduxState) => boolean,
//   ): tMeal;
//   (
//     mySelector: (state: tReduxState) => any,
//     myType: "mood",
//     myEqualityFn?: (prev: tReduxState, next: tReduxState) => boolean,
//   ): tMoodReading;
// } = function useSuperSelector(mySelector: any, myType: any, myEqualityFn?: any): tMeal | tMoodReading | any {
//   const aReturn = useSelector(mySelector, myEqualityFn ?? isEqual);
//   if (myType !== "infer" && hasTypeProperty(aReturn) && aReturn.type !== myType) {
//     console.log(`Error in useSuperSelector expected ${myType}!`, aReturn);
//   }
//   return aReturn;
// };

// eslint-disable-next-line func-style
function hasTypeProperty(obj: any): obj is any {
  return typeof obj === "object" && obj !== null && "type" in obj;
}

// Usage

// const test = useSuperSelector(() => ({ type: "meal", isSkipped: false }), "meal"); // test has type tMeal
// const test1 = useSuperSelector(() => 1, "meal"); // test1 has type tMeal but throws an error because it is not a tMeal
// const test2 = useSuperSelector(() => 1, "infer"); // test2 has type number

export const isEqual: {
  (a: number, b: number): boolean;
  (a: string, b: string): boolean;
  (a: number[], b: number[]): boolean;
  (a: boolean, b: boolean): boolean;
  (a: undefined, b: undefined): boolean;
  (a: any, b: any): boolean;
} = function isEqual(a: any, b: any): boolean {
  if ((a === undefined && b === undefined) || (a === null && b === null)) {
    return true;
  } else if (typeof a !== typeof b) {
    return false;
  } else if ((a === null || b === null) && a !== b) {
    return false;
  } else if (typeof a === "number" || typeof a === "string" || typeof a === "boolean") {
    return a === b;
  } else if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!shallowEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else if (
    typeof a === "object" &&
    typeof b === "object" &&
    a.modDateTime !== undefined &&
    b.modDateTime !== undefined &&
    a.type === b.type
  ) {
    return a.modDateTime === b.modDateTime;
  } else {
    return shallowEqual(a, b);
  }
};
