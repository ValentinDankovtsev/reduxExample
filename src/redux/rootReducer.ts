import { State, Action } from "../createStore";

type newState = any;

export function rootReducer(state: State, action: Action): newState {
  if (action.type === "INCREMENT") {
    return state + 1;
  }
  if (action.type === "DECREMENT") {
    return state - 1;
  }
  return state;
}

export function multplyReducer(state: State, action: Action): newState {
  if (action.type === "MULTIPLY") {
    return state * 5;
  }
  return state;
}
