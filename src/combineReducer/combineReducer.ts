import { Reducers, State, Action } from "../types";

export function combineReducers(
  reducersMap: Reducers
): (state?: State | undefined, action?: Action) => State {
  return function combinationReducer(state?: State, action?: Action): State {
    const nextState = {} as State;

    Object.keys(reducersMap).forEach((key) => {
      if (state) {
        nextState[key] = reducersMap[key](state[key], action);
      }
    });
    return nextState;
  };
}
