/* eslint-disable @typescript-eslint/no-explicit-any */
import { router } from "expo-router";
import { tThunkDispatch } from "../types";
import _ from "lodash";
import { _animateFuzzy, AssistantClient, executeInAppAction } from "../../functions";
import { tAppState } from "./types";
import { store } from "..";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//backend python function old
// export const submitData = async (data: any, dispatch: any): Promise<string | undefined> => {
//   console.log("Data being sent12: ", JSON.stringify(data));
//   dispatch({ rIsThinking: true, type: "SET_THINKING_STATE" });
//   try {
//     const response = await fetch("http://localhost:5001/submit-data", {
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//     });
//     const responseJson = await response.json();
//     const functions = JSON.parse(responseJson.functions);
//     console.log(responseJson);
//     dispatch({ rIsThinking: false, type: "SET_THINKING_STATE" });
//     // await _callFunction(functions, dispatch);
//     // .then(() => {
//     //   _animateFuzzy(300, 300);
//     // });
//     return JSON.stringify(responseJson);
//   } catch (error) {
//     dispatch({ rIsThinking: false, type: "SET_THINKING_STATE" });
//     console.error("Error submitting data:", error);
//     return undefined;
//   }
// };

export const aNav = (myScreen: string): tThunkDispatch => {
  return (dispatch, _getState) => {
    let screenName: string;
    switch (myScreen) {
      case "/":
        screenName = "home screen";
        break;
      case "/screen1":
        screenName = "login screen";
        break;
      case "/screen2":
        screenName = "settings screen";
        break;
      default:
        screenName = "home screen";
        break;
    }
    console.log("screenName:", screenName);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    dispatch({ rCurrentScreen: screenName, type: "SET_APP_STATE" });
    router.push(myScreen);
  };
};

export const submitData = async (
  data: { goal: string; state: tAppState },
  dispatch: any,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): Promise<any | undefined> => {
  try {
    dispatch({ rIsThinking: true, type: "SET_THINKING_STATE" });

    ///AI
    const fuzzy = new AssistantClient("asst_wBJVX5tBztDMg1mGEssYLyow");
    const execute_action = async (screen: string, action: string) => {
      const rAppState = store.getState().AppReducer;
      console.log("CURRENT STATE: ", rAppState);
      if (rAppState === undefined) return "State is undefine, please try again";
      const actionExecute = await executeInAppAction(rAppState, screen, action, dispatch);

      if (actionExecute !== "State updated") {
        console.log("FAIL STATE: ", actionExecute);
        return actionExecute;
      } else {
        // const NewState = store.getState().AppReducer;
        console.log("RETURN STATE: ", store.getState().AppReducer);
        return JSON.stringify(store.getState().AppReducer);
      }
    };
    fuzzy.addFunction(execute_action);
    const assistantCall = await fuzzy.call(JSON.stringify(data));
    ///END
    console.log("assistantCall: ", assistantCall);
    dispatch({ rFinalMessage: assistantCall, type: "SET_FINAL_MESSAGE" });
    return assistantCall;
  } catch (error) {
    dispatch({ rFinalMessage: "", type: "SET_FINAL_MESSAGE" });
    dispatch({ rIsThinking: false, type: "SET_THINKING_STATE" });
    console.error("Error submitting data:", JSON.stringify(error));
    return undefined;
  }
};
