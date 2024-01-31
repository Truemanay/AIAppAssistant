/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { store } from "./redux/index";
import { aNav } from "./redux/appState/thunkActions";
import { tThunkDispatch } from "./redux/types";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";
import { tAppState } from "./redux/appState/types";
import { ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages";
import { findRecordByAction } from "../module/appStructure/recordStore";

export const fetchData = async (): Promise<string | undefined> => {
  try {
    const myFetch = await fetch("http://localhost:5001");
    const responseText = await myFetch.text();
    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const _goBack = async (dispatch: (arg0: tThunkDispatch) => void, action: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      store.dispatch({ rFocusName: false, type: "SET_APP_STATE" });
      store.dispatch({ rFocusPassword: false, type: "SET_APP_STATE" });
      dispatch(aNav("/"));
      resolve();
    }, 1200);
    const myPath = findRecordByAction(action);
    if (myPath !== undefined) {
      const { x } = myPath;
      const { y } = myPath;
      _animateFuzzy(x, y);
    }
  });
};

export const _animateFuzzy = (endX: number, endY: number) => {
  store.dispatch({ rStartAnimation: true, rStartX: endX, rStartY: endY, type: "SET_ANIM_STATE" });
  store.dispatch({ rIsThinking: false, type: "SET_THINKING_STATE" });
  setTimeout(() => {
    store.dispatch({ rStartAnimation: false, rStartX: endX, rStartY: endY, type: "SET_ANIM_STATE" });
  }, 999);
};
export const _login = async (action: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      store.dispatch({ rLoggedIn: true, type: "SET_APP_STATE" });
      resolve();
    }, 1200);

    const myPath = findRecordByAction(action);
    if (myPath !== undefined) {
      const { x } = myPath;
      const { y } = myPath;
      _animateFuzzy(x, y);
    }
  });
};
export const _logOut = async (action: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      store.dispatch({ rLoggedIn: false, type: "SET_APP_STATE" });
      resolve();
    }, 1200);
    const myPath = findRecordByAction(action);
    if (myPath !== undefined) {
      const { x } = myPath;
      const { y } = myPath;
      _animateFuzzy(x, y);
    }
  });
};
export const _focusName = async (action: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      store.dispatch({ rFocusName: true, type: "SET_APP_STATE" });
      resolve();
    }, 1200);
    const myPath = findRecordByAction(action);
    if (myPath !== undefined) {
      const { x } = myPath;
      const { y } = myPath;
      _animateFuzzy(x, y);
    }
  });
};
export const _focusPassword = async (action: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      store.dispatch({ rFocusPassword: true, type: "SET_APP_STATE" });
      resolve();
    }, 1200);
    const myPath = findRecordByAction(action);
    if (myPath !== undefined) {
      const { x } = myPath;
      const { y } = myPath;
      _animateFuzzy(x, y);
    }
  });
};
export const _navtoScreen1 = async (dispatch: (arg0: tThunkDispatch) => void, action: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      dispatch(aNav("/screen1"));
      resolve();
    }, 1200);
    const myPath = findRecordByAction(action);
    if (myPath !== undefined) {
      const { x } = myPath;
      const { y } = myPath;
      _animateFuzzy(x, y);
    }
  });
};
export const _navtoScreen2 = async (dispatch: (arg0: tThunkDispatch) => void, action: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      dispatch(aNav("/screen2"));
      resolve();
    }, 1200);
    const myPath = findRecordByAction(action);
    if (myPath !== undefined) {
      const { x } = myPath;
      const { y } = myPath;
      _animateFuzzy(x, y);
    }
  });
};

export const executeInAppAction = async (
  state: tAppState,
  screen: string,
  action: string,
  dispatch: any,
): Promise<string> => {
  store.dispatch({ rIsThinking: true, type: "SET_THINKING_STATE" });
  const invalidAction = (currentScreen: string, currentAction: string): string => {
    store.dispatch({ rIsThinking: false, type: "SET_THINKING_STATE" });
    return `Invalid action ${currentAction} for screen ${currentScreen}`;
  };

  if (state.rCurrentScreen !== screen) {
    const failure = invalidAction(screen, action);
    console.log("FAILURE SCREENS DONT MATCH: ", `StateScreen: ${state.rCurrentScreen} | Screen: ${screen}`);
    return failure;
  }

  switch (screen) {
    case "home screen":
      if (action === "login screen") {
        // state.rCurrentScreen = "login screen";
        await _navtoScreen1(dispatch, action);
      } else if (action === "settings screen") {
        // state.rCurrentScreen = "settings screen";
        await _navtoScreen2(dispatch, action);
      } else {
        return invalidAction(screen, action);
      }
      break;
    case "login screen":
      if (action === "Go back") {
        // state.rCurrentScreen = "home screen";
        await _goBack(dispatch, action);
      } else if (action === "Login" && !state.rLoggedIn) {
        // state.rLoggedIn = true;
        await _login(action);
      } else if (action === "Logout" && state.rLoggedIn) {
        // state.rLoggedIn = false;
        await _logOut("login");
      } else {
        return invalidAction(screen, action);
      }
      break;
    case "settings screen":
      if (action === "Go back") {
        // state.rCurrentScreen = "home screen";
        // state.rFocusName = false;
        // state.rFocusPassword = false;
        await _goBack(dispatch, action);
      } else if (action === "Change username" && state.rLoggedIn) {
        // state.rFocusName = true;
        console.log("FOCUS NAME");
        await _focusName(action);
      } else if (action === "Change password" && state.rLoggedIn) {
        // state.rFocusPassword = true;
        await _focusPassword(action);
      } else {
        return invalidAction(screen, action);
      }
      break;
    default:
      return invalidAction(screen, action);
  }

  return "State updated";
};

type ToolResponse = {
  tool_call_id: string;
  output: string;
};

interface Assistant {
  id: string;
  name: string;
  instructions: string;
  model: string;
  functions: Record<string, any>;
  codeInterpreter: boolean;
  retrieval: boolean;
}

const myOpenAIKey = "";

class AssistantClient {
  private assistantId: string;
  private functions: Record<string, (...args: any[]) => Promise<string>>;
  private currThreadId: string | null;
  // private openaiClient: OpenAI;

  constructor(assistant: Assistant | string) {
    this.assistantId = typeof assistant === "string" ? assistant : assistant.id;
    this.functions = {};
    this.currThreadId = null;
    // this.openaiClient = new OpenAI({ apiKey: "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" }); // Assuming a constructor for OpenAI
  }

  addFunction(func: (...args: any[]) => Promise<string> | string): void {
    this.functions[func.name] = (...args: any[]) => {
      const result = func(...args);
      return result instanceof Promise ? result : Promise.resolve(result);
    };
  }

  async newThread(): Promise<void> {
    //This redline might just be ts error
    // const thread: Thread = await this.openaiClient.beta.threads.create();
    let thread: Thread;
    console.log(`New thread function`);
    try {
      const response = await fetch("https://api.openai.com/v1/threads", {
        // Assuming GET since -d '' indicates an empty data payload
        headers: {
          Authorization: `Bearer ${myOpenAIKey}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v1",
        },
        method: "POST",
      });

      const responseJSON = await response.json();

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      thread = responseJSON as unknown as Thread;
    } catch (error) {
      console.error("There was a problem creating a new thread:", error);
      throw new Error("There was a problem creating a new thread");
    }
    console.log(`New thread created: ${thread}`);
    console.log(`New thread created Test: `, JSON.stringify(thread));
    this.currThreadId = thread.id;
  }

  setThread(threadId: string): void {
    this.currThreadId = threadId;
  }

  getThread(): string | null {
    return this.currThreadId;
  }

  async call(message: string): Promise<string> {
    console.log(`Calling assistant ${this.assistantId} with message: ${message}`);

    let thread: Thread;
    if (this.currThreadId !== null) {
      try {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const response = await fetch(`https://api.openai.com/v1/threads/${this.currThreadId}`, {
          headers: {
            Authorization: `Bearer ${myOpenAIKey}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v1",
          },
          method: "GET",
        });

        const responseJSON = await response.json();
        thread = responseJSON;
      } catch (error) {
        console.error("There was a problem getting thread:", error);
        throw new Error("There was a problem getting thread");
      }
    } else {
      console.log(`No thread found. Creating new thread for assistant ${this.assistantId}...`);
      try {
        const response = await fetch("https://api.openai.com/v1/threads", {
          // Assuming GET since -d '' indicates an empty data payload
          headers: {
            Authorization: `Bearer ${myOpenAIKey}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v1",
          },
          method: "POST",
        });

        const responseJSON = await response.json();

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        thread = responseJSON as unknown as Thread;
      } catch (error) {
        console.error("There was a problem creating a new thread:", error);
        throw new Error("There was a problem creating a new thread");
      }
      console.log(`New thread created: ${thread}`);
      console.log(`New thread created: `, JSON.stringify(thread));
      this.currThreadId = thread.id;
    }

    // Send message
    // await this.openaiClient.beta.threads.messages.create(thread.id, {
    //   content: message,
    //   role: "user",
    // });
    try {
      await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
        body: JSON.stringify({
          content: message,
          role: "user",
        }),
        headers: {
          Authorization: `Bearer ${myOpenAIKey}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v1",
        },
        method: "POST",
      });
    } catch (error) {
      console.error("There was a problem sending messages:", error);
    }

    // Begin running the assistant on the thread to generate a response
    // let run: Run = await this.openaiClient.beta.threads.runs.create(thread.id, {
    //   assistant_id: this.assistantId,
    // });
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let run: Run;

    try {
      console.log("ThreadId:", thread.id);
      const runResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
        body: JSON.stringify({
          assistant_id: this.assistantId,
        }),
        headers: {
          Authorization: `Bearer ${myOpenAIKey}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v1",
        },
        method: "POST",
      });

      const responseJSON = await runResponse.json();
      console.log("Run Response:", responseJSON);
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      run = responseJSON as unknown as Run;
    } catch (error) {
      console.error("There was a problem running the assistant:", error);
      throw new Error("There was a problem running the assistant");
    }

    // Wait for the assistant to respond
    while (run.status !== "completed") {
      console.log(`Waiting on assistant ${this.assistantId} to respond...`);
      console.log(`Status: ${run.status}`);
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      await new Promise((resolve) => setTimeout(resolve, 250));
      // run = await this.openaiClient.beta.threads.runs.retrieve(thread.id, run.id);
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const runResponseIncomplete = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`, {
        headers: {
          Authorization: `Bearer ${myOpenAIKey}`,
          "OpenAI-Beta": "assistants=v1",
        },
        method: "GET",
      });

      const responseJSON = await runResponseIncomplete.json();
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      run = responseJSON as unknown as Run;

      if (["cancelled", "failed", "expired"].includes(run.status)) {
        throw new Error(
          `Assistant ${this.assistantId} run failed with status ${run.status}${
            run.last_error ? `and error ${run.last_error}` : ""
          }`,
        );
      }

      if (run.status === "requires_action") {
        console.log(`Assistant ${this.assistantId} requires action. Calling functions...`);
        const toolCalls = run.required_action?.submit_tool_outputs.tool_calls;
        if (toolCalls === undefined) throw new Error("Tool calls undefined");

        const toolOutputs: ToolResponse[] = [];
        const toolOutputsPromises: Array<Promise<string>> = [];

        for (const toolCall of toolCalls) {
          const toolOutputObj: ToolResponse = {
            output: "",
            tool_call_id: toolCall.id,
          };

          if (toolCall.function.name in this.functions) {
            const args = JSON.parse(toolCall.function.arguments);
            console.log(`Calling ${toolCall.function.name} with args ${JSON.stringify(args)}...`);
            const { screen, action } = args;
            const func = this.functions[toolCall.function.name];
            const result = func(screen, action);
            toolOutputsPromises.push(result);
          } else {
            throw new Error(`Assistant ${this.assistantId} requested unknown function ${toolCall.function.name}`);
          }

          toolOutputs.push(toolOutputObj);
        }

        // Wait for tool outputs to resolve
        const toolOutputsResults = await Promise.all(toolOutputsPromises);
        toolOutputsResults.forEach((output, idx) => {
          toolOutputs[idx].output = output;
        });

        // Submit tool outputs
        // run = await this.openaiClient.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
        //   tool_outputs: toolOutputs,
        // });
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const runResponseComplete = await fetch(
          `https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}/submit_tool_outputs`,
          {
            body: JSON.stringify({ tool_outputs: toolOutputs }),
            headers: {
              Authorization: `Bearer ${myOpenAIKey}`,
              "Content-Type": "application/json",
              "OpenAI-Beta": "assistants=v1",
            },
            method: "POST",
          },
        );

        const responseJSONEnd = await runResponseComplete.json();
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        run = responseJSONEnd as unknown as Run;

        console.log(`Tool outputs submitted. Waiting for assistant ${this.assistantId} to respond...`);
      }
    }

    console.log("Done.");

    // const messages = await this.openaiClient.beta.threads.messages.list(thread.id);
    let messages: ThreadMessagesPage;
    try {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const response = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
        headers: {
          Authorization: `Bearer ${myOpenAIKey}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v1",
        },
        method: "GET",
      });

      const responseJSONEnd = await response.json();
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      messages = responseJSONEnd as unknown as ThreadMessagesPage;
    } catch (error) {
      console.error("There was a problem getting messages:", error);
      throw new Error("There was a problem getting messages");
    }

    if (messages.data[0].content[0].type !== "text") {
      return `Invalid response type ${messages.data[0].content[0].type} from assistant ${this.assistantId}`;
    } else {
      return messages.data[0].content[0].text.value;
    }
  }
}

export { AssistantClient };

// export const submitDataTest = async (data: any): Promise<string | void> => {
//   // const openai = (new OpenAI().apiKey = "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");
//   console.log("Data being sent12: ", JSON.stringify(data));

//   try {
//     const requestBody = {
//       content: "How does AI work? Explain it in simple terms.",
//       role: "user",
//     };

//     try {
//       const response = await fetch("https://api.openai.com/v1/threads/thread_fzi8SIh0KHO9pFeuqve8BfeK/messages", {
//         body: JSON.stringify(requestBody),
//         headers: {
//           Authorization: `Bearer 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`,
//           "Content-Type": "application/json",
//           "OpenAI-Beta": "assistants=v1",
//         },
//         method: "POST",
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data1 = await response.json();
//       console.log(data1); // Handle the response data as needed
//     } catch (error) {
//       console.error("There was a problem with the fetch operation:", error);
//     }
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//   }
// };

// export const _callFunction = async (myPath: Array<{ screen: string; action: string }>, dispatch: any) => {
//   for (const element of myPath) {
//     console.log("myPath[i]:", element);
//     switch (element.action) {
//       case "Go back":
//         await _goBack(dispatch);
//         break;
//       case "Login":
//         await _login();
//         break;
//       case "Logout":
//         await _logOut();
//         break;
//       case "log in screen":
//         await _navtoScreen1(dispatch);
//         break;
//       case "settings screen":
//         await _navtoScreen2(dispatch);
//         break;
//       case "Change username":
//         await _focusName();
//         break;
//       case "Change password":
//         await _focusPassword();
//         break;
//     }
//     // eslint-disable-next-line @typescript-eslint/no-loop-func
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//   }
// };
