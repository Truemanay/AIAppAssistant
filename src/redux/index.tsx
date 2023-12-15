/* eslint-disable @typescript-eslint/no-require-imports */
import React, { Dispatch, FC, useCallback } from "react";
import { Platform } from "react-native";
import { Provider, useDispatch as useReduxDispatch } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { applyMiddleware, combineReducers, createStore } from "redux";
// import { PersistConfig, persistReducer } from "redux-persist";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import type { tDispatchAction, tThunkDispatch } from "./types";
/**
 * Import reducers here!
 * Make sure that when we create new reducers we add them here!
 * like 'SampleReducer' below
 *
 * Also make sure to update the 'tReduxState'
 * type with any new reducers we add in the 'types.ts'
 * file in this folder!
 */
import { AppReducer } from "./appState/reducer";

// /** *** */
const RootReducer = combineReducers({
  AppReducer,
});

/**
 * Configures the redux store
 * @returns <store, persistedStore> the redux store and redux-persist store
 * (to be used with the redux / redux-persist provider components)
 * see https://github.com/rt2zz/redux-persist for more details on the persisted store
 */
const configureStore = () => {
  // const persistConfig: PersistConfig<any> = {
  //   key: "root",
  //   storage: AsyncStorage,
  //   transforms: [],
  //   whitelist: [],
  // };
  // const reducer = persistReducer(persistConfig, RootReducer);
  const reducer = RootReducer;

  const aMiddleWareList = [Thunk];
  // if (__DEV__) {
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   const createDebugger = require("redux-flipper").default;
  //   aMiddleWareList.push(createDebugger());
  // }
  let enhancer = applyMiddleware(...aMiddleWareList);
  if (Platform.OS !== "web" && __DEV__) {
    const devToolConfig = {
      name: "Fuzzy.Day",
    };
    enhancer = composeWithDevTools(devToolConfig)(enhancer);
  }
  const store = createStore(reducer, enhancer);
  // const persistedStore = persistStore(store);
  return store;
};

const store = configureStore();

/**
 * purgePersistedState
 * purges state from disk and returns a Promise
 * (calls the redux-persist persistedStore.purge method)
const purgePersistedState = (): Promise<unknown> => {
  return persistedStore.purge();
};
 */

/**
 * Redux HOC
 *
 * Provides all child components with the redux store context
 * (i.e. connect and useSuperSelector / useDispatch calls)
 */
const withRedux = (WrappedComponent: FC) => {
  return function ReduxContainer(): JSX.Element {
    return (
      <Provider store={store}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <WrappedComponent />
      </Provider>
    );
  };
};

/**
 * Redux Smart Dispatch Hook
 * @returns {Dispatch<tDispatchAction>} A fully typed and memoized version of the redux store dispatch function
 */
const useDispatch = (): Dispatch<tDispatchAction | tThunkDispatch> => {
  const aDispatch = useReduxDispatch();
  const dispatch: Dispatch<tDispatchAction | tThunkDispatch> = useCallback(aDispatch, [aDispatch]);
  return dispatch;
};

// type tAdditionalFilter<T> = {
//   readonly [K in keyof T]?: {
//     opStr: FirebaseFirestoreTypes.WhereFilterOp;
//     value: T[K] | Array<string>;
//   };
// };

// type tOrderParams<T> = Array<{
//   fieldPath: keyof T & (string | number);
//   directionStr?: "asc" | "desc";
// }>;

// type tFirestoreOnSnapshotParams<T> = {
//   myPath: string;
//   myValidator: (value: unknown) => T;
//   myFetchCallback: (
//     params: Array<T>,
//     listCursor?: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
//   ) => void;
//   myErrorCallback?: (error: Error) => void;
//   myAdditionalFilters?: tAdditionalFilter<T>;
//   myOrderParams?: tOrderParams<T>;
//   myLimit?: number;
//   myStart?: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | number;
//   myEnd?: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | number;
// };

// type tpFirestoreOnSnapshot = <T>(myParams: tFirestoreOnSnapshotParams<T>) => (() => void) | undefined;

// export const firestoreOnSnapshot: tpFirestoreOnSnapshot = ({
//   myPath,
//   myValidator,
//   myFetchCallback,
//   myErrorCallback = () => 0,
//   myAdditionalFilters,
//   myOrderParams,
//   myLimit,
//   myStart,
//   myEnd,
// }) => {
//   try {
//     let aQuery: FirebaseFirestoreTypes.CollectionReference | FirebaseFirestoreTypes.Query =
//       firestore().collection(myPath);

//     if (myAdditionalFilters !== undefined) {
//       let myKey: keyof typeof myAdditionalFilters & (string | number);

//       for (myKey in myAdditionalFilters) {
//         if (Object.prototype.hasOwnProperty.call(myAdditionalFilters, myKey)) {
//           const aQueryCondition = myAdditionalFilters[myKey];
//           if (aQueryCondition !== undefined) {
//             aQuery = aQuery.where(myKey, aQueryCondition.opStr, aQueryCondition.value);
//           }
//         }
//       }
//     }

//     if (myOrderParams !== undefined) {
//       myOrderParams.forEach((orderObject) => {
//         aQuery = aQuery.orderBy(orderObject.fieldPath, orderObject.directionStr);
//       });
//       // aQuery = aQuery.orderBy(myOrderParams.fieldPath, myOrderParams.directionStr);
//     }

//     if (myStart !== undefined) {
//       aQuery = aQuery.startAt(myStart);
//     } else if (myEnd !== undefined) {
//       aQuery = aQuery.endBefore(myEnd);
//     }

//     if (myLimit !== undefined && !myEnd) {
//       aQuery = aQuery.limit(myLimit);
//     } else if (myLimit !== undefined && myEnd) {
//       aQuery = aQuery.limitToLast(myLimit);
//     }

//     return aQuery.onSnapshot(
//       (myQuery) => {
//         try {
//           if (!myQuery || myQuery.empty) {
//             return;
//           }
//           const validatedQuery = myQuery.docs.map((myDocument) => myValidator(myDocument.data()));
//           // const cursorIndex = Math.ceil((myLimit ?? 0) / 2);
//           // let listCursor: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | undefined;
//           // if (myQuery.docs.length === myLimit) {
//           //   listCursor = myQuery.docs[cursorIndex];
//           // } else if (myStart) {
//           //   listCursor = myQuery.docs[myQuery.docs.length - 1];
//           // } else if (myEnd) {
//           //   listCursor = myQuery.docs[0];
//           // }
//           myFetchCallback(validatedQuery);
//         } catch (e) {
//           const error = errorFactory(e);
//           myErrorCallback(error);
//           const message = `onSnapshot onNext error! Error: message: ${error?.message}, stack: ${error?.stack}`;

//           console.warn(message);
//           crashlytics().recordError(error, "onSnapshot error!");
//         }
//       },
//       (e) => {
//         const error = errorFactory(e);
//         myErrorCallback(error);
//         const message = `onSnapshot error! Error: message: ${error?.message}, stack: ${error?.stack}`;

//         console.warn(message);
//         crashlytics().recordError(error, "onSnapshot error!");
//       },
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       myErrorCallback(error);
//       crashlytics().log(`Error fetching call for firebase path: ${myPath}`);
//     }
//   }
//   return undefined;
// };

// export const firestoreOnSnapshotUnsafe: tpFirestoreOnSnapshot = ({
//   myPath,
//   myValidator,
//   myFetchCallback,
//   myErrorCallback = () => 0,
//   myAdditionalFilters,
//   myOrderParams,
//   myLimit,
//   myStart,
// }) => {
//   try {
//     let aQuery: FirebaseFirestoreTypes.CollectionReference | FirebaseFirestoreTypes.Query =
//       firestore().collection(myPath);
//     if (myAdditionalFilters !== undefined) {
//       let myKey: keyof typeof myAdditionalFilters & (string | number);

//       for (myKey in myAdditionalFilters) {
//         if (Object.prototype.hasOwnProperty.call(myAdditionalFilters, myKey)) {
//           const aQueryCondition = myAdditionalFilters[myKey];
//           if (aQueryCondition !== undefined) {
//             aQuery = aQuery.where(myKey, aQueryCondition.opStr, aQueryCondition.value);
//           }
//         }
//       }
//     }

//     if (myOrderParams !== undefined) {
//       myOrderParams.forEach((orderObject) => {
//         aQuery = aQuery.orderBy(orderObject.fieldPath, orderObject.directionStr);
//       });
//       // aQuery = aQuery.orderBy(myOrderParams.fieldPath, myOrderParams.directionStr);
//     }

//     if (myLimit !== undefined) {
//       aQuery = aQuery.limit(myLimit);
//     }

//     if (myStart !== undefined) {
//       aQuery.startAt(myStart);
//     }

//     return aQuery.onSnapshot(
//       (myQuery) => {
//         try {
//           if (!myQuery || myQuery.empty) {
//             return;
//           }
//           const validatedQuery = myQuery.docs.map((myDocument) => myValidator(myDocument.data()));
//           const lastReference = myQuery.docs[myQuery.docs.length - 1];
//           myFetchCallback(validatedQuery, lastReference);
//         } catch (error) {
//           if (error instanceof Error) {
//             myErrorCallback(error);
//             const message = `onSnapshot onNext error! Error: message: ${error?.message}, stack: ${error?.stack}`;

//             console.warn(message);
//             crashlytics().recordError(error, "onSnapshot error!");
//           }
//         }
//       },
//       (error: Error) => {
//         myErrorCallback(error);
//         const message = `onSnapshot error! Error: message: ${error?.message}, stack: ${error?.stack}`;

//         console.warn(message);
//         crashlytics().recordError(error, "onSnapshot error!");
//       },
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       myErrorCallback(error);
//       crashlytics().log(`Error fetching call for firebase path: ${myPath}`);
//       return () => undefined;
//     }
//   }
//   return undefined;
// };

export { store, withRedux, useDispatch };
