import { router } from "expo-router";
import { tThunkDispatch } from "../types";
import _ from "lodash";
import { _animateFuzzy, _callFunction, AssistantClient } from "../../functions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const submitData = async (data: any, dispatch: any): Promise<string | undefined> => {
  console.log("Data being sent12: ", JSON.stringify(data));
  dispatch({ rIsThinking: true, type: "SET_THINKING_STATE" });
  try {
    const response = await fetch("http://localhost:5001/submit-data", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const responseJson = await response.json();
    const functions = JSON.parse(responseJson.functions);
    console.log(responseJson);
    dispatch({ rIsThinking: false, type: "SET_THINKING_STATE" });
    await _callFunction(functions, dispatch);
    // .then(() => {
    //   _animateFuzzy(300, 300);
    // });
    return JSON.stringify(responseJson);
  } catch (error) {
    dispatch({ rIsThinking: true, type: "SET_THINKING_STATE" });
    console.error("Error submitting data:", error);
    return undefined;
  }
};

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

export const submitDataTest = async (data: any, dispatch: any): Promise<string | undefined> => {
  console.log("Data being sent12: ", JSON.stringify(data));
  try {
    const fuzzy = new AssistantClient("asst_wBJVX5tBztDMg1mGEssYLyow", "sk-l");
    const hello = await fuzzy.call("Hello");
    return hello;
  } catch (error) {
    console.error("Error submitting data:", error);
    return undefined;
  }
};
