/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { store } from "./redux/index";
import { aNav } from "./redux/appState/thunkActions";
import { tThunkDispatch } from "./redux/types";
import { OpenAI } from "openai"; // Assuming similar module structure in TypeScript
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";
import { Messages } from "openai/resources/beta/threads/messages/messages";
import { tAppState } from "./redux/appState/types";

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

export const _goBack = (dispatch: (arg0: tThunkDispatch) => void) => {
  setTimeout(() => {
    store.dispatch({ rFocusName: false, type: "SET_APP_STATE" });
    store.dispatch({ rFocusPassword: false, type: "SET_APP_STATE" });
    dispatch(aNav("/"));
  }, 1200);
  _animateFuzzy(5, 80);
};

export const _animateFuzzy = (endX: number, endY: number) => {
  store.dispatch({ rStartAnimation: true, rStartX: endX, rStartY: endY, type: "SET_ANIM_STATE" });
  setTimeout(() => {
    store.dispatch({ rStartAnimation: false, rStartX: endX, rStartY: endY, type: "SET_ANIM_STATE" });
  }, 999);
};
export const _login = () => {
  setTimeout(() => {
    store.dispatch({ rLoggedIn: true, type: "SET_APP_STATE" });
  }, 1200);
  _animateFuzzy(170, 225);
};
export const _logOut = () => {
  setTimeout(() => {
    store.dispatch({ rLoggedIn: false, type: "SET_APP_STATE" });
  }, 1200);
  _animateFuzzy(170, 225);
};
export const _focusName = () => {
  setTimeout(() => {
    store.dispatch({ rFocusName: true, type: "SET_APP_STATE" });
  }, 1200);
  _animateFuzzy(335, 190);
};
export const _focusPassword = () => {
  setTimeout(() => {
    store.dispatch({ rFocusPassword: true, type: "SET_APP_STATE" });
  }, 1200);
  _animateFuzzy(340, 245);
};
export const _navtoScreen1 = (dispatch: (arg0: tThunkDispatch) => void) => {
  setTimeout(() => {
    dispatch(aNav("/screen1"));
  }, 1200);
  _animateFuzzy(100, 210);
};
export const _navtoScreen2 = (dispatch: (arg0: tThunkDispatch) => void) => {
  setTimeout(() => {
    dispatch(aNav("/screen2"));
  }, 1200);
  _animateFuzzy(260, 215);
};

export const _callFunction = async (myPath: Array<{ screen: string; action: string }>, dispatch: any) => {
  for (const element of myPath) {
    console.log("myPath[i]:", element);
    switch (element.action) {
      case "Go back":
        await _goBack(dispatch);
        break;
      case "Login":
        await _login();
        break;
      case "Logout":
        await _logOut();
        break;
      case "log in screen":
        await _navtoScreen1(dispatch);
        break;
      case "settings screen":
        await _navtoScreen2(dispatch);
        break;
      case "Change username":
        await _focusName();
        break;
      case "Change password":
        await _focusPassword();
        break;
    }
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
};

const executeAction = (state: tAppState, screen: string, action: string): string => {
  const invalidAction = (currentScreen: string, currentAction: string): string => {
    return `Invalid action ${currentAction} for screen ${currentScreen}`;
  };

  switch (screen) {
    case "home screen":
      if (action === "login screen") {
        state.rCurrentScreen = "login screen";
      } else if (action === "settings screen") {
        state.rCurrentScreen = "settings screen";
      } else {
        return invalidAction(screen, action);
      }
      break;
    case "login screen":
      if (action === "Go back") {
        state.rCurrentScreen = "home screen";
      } else if (action === "Login" && !state.rLoggedIn) {
        state.rLoggedIn = true;
      } else if (action === "Logout" && state.rLoggedIn) {
        state.rLoggedIn = false;
      } else {
        return invalidAction(screen, action);
      }
      break;
    case "settings screen":
      if (action === "Go back") {
        state.rCurrentScreen = "home screen";
        state.rFocusName = false;
        state.rFocusPassword = false;
      } else if (action === "Change username" && state.rLoggedIn) {
        state.rFocusName = true;
      } else if (action === "Change password" && state.rLoggedIn) {
        state.rFocusPassword = true;
      } else {
        return invalidAction(screen, action);
      }
      break;
    default:
      return invalidAction(screen, action);
  }

  return JSON.stringify(state);
};

type ToolResponse = {
  toolCallId: string;
  output: Promise<string> | string;
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

class AssistantClient {
  private assistantId: string;
  private functions: Record<string, (...args: any[]) => string>;
  private currThreadId: string | null;
  private openaiClient: OpenAI;

  constructor(assistant: Assistant | string) {
    this.assistantId = typeof assistant === "string" ? assistant : assistant.id;
    this.functions = {};
    this.currThreadId = null;
    this.openaiClient = new OpenAI(); // Assuming a constructor for OpenAI
  }

  addFunction(func: (...args: any[]) => string): void {
    this.functions[func.name] = func;
  }

  newThread(): void {
    //This redline might just be ts error
    const thread: Thread = this.openaiClient.beta.threads.create();
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
      thread = this.openaiClient.beta.threads.retrieve(this.currThreadId);
    } else {
      thread = this.openaiClient.beta.threads.create();
      this.currThreadId = thread.id;
    }

    // Send message
    const messageObj: Messages = this.openaiClient.beta.threads.messages.create(thread.id, {
      content: message,
      role: "user",
      //   threadId: thread.id,
    });

    // Begin running the assistant on the thread to generate a response
    let run = this.openaiClient.beta.threads.runs.create(thread.id, {
      assistant_id: this.assistantId,
    });

    // Wait for the assistant to respond
    while (run.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 250));
      run = this.openaiClient.beta.threads.runs.retrieve(thread.id, run.id);

      if (["cancelled", "failed", "expired"].includes(run.status)) {
        throw new Error(
          `Assistant ${this.assistantId} run failed with status ${run.status}${
            run.last_error ? `and error ${run.last_error}` : ""
          }`,
        );
      }

      if (run.status === "requires_action") {
        console.log(`Assistant ${this.assistantId} requires action. Calling functions...`);
        const toolCalls = run.required_action.submit_tool_outputs.tool_calls;

        const toolOutputs: ToolResponse[] = [];

        for (const toolCall of toolCalls) {
          const toolOutputObj: ToolResponse = {
            output: "",
            toolCallId: toolCall.id,
          };

          if (toolCall.function.name in this.functions) {
            const args = JSON.parse(toolCall.function.arguments);
            console.log(`Calling ${toolCall.function.name} with args ${args}...`);

            toolOutputObj.output = this.functions[toolCall.function.name](...args);
          } else {
            throw new Error(`Assistant ${this.assistantId} requested unknown function ${toolCall.function.name}`);
          }

          toolOutputs.push(toolOutputObj);
        }

        // Resolve coroutine outputs
        const coroutineIdxs = toolOutputs
          .map((output, idx) => (output.output instanceof Promise ? idx : -1))
          .filter((idx) => idx !== -1);
        const coroutineResults = await Promise.all(coroutineIdxs.map((idx) => toolOutputs[idx].output));
        coroutineIdxs.forEach((idx, i) => {
          toolOutputs[idx].output = coroutineResults[i];
        });

        // Submit tool outputs
        run = this.openaiClient.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
          tool_outputs = toolOutputs,
        });

        console.log(`Tool outputs submitted. Waiting for assistant ${this.assistantId} to respond...`);
      }
    }

    const messages = this.openaiClient.beta.threads.messages.list(thread.id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return messages.data[0].content[0].text.value;
  }
}

export { AssistantClient };
