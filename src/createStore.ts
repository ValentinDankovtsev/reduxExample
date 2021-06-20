import { Reducer, State, IStore } from "./types";

export function createStore(rootReducer: Reducer, initialState: State): IStore {
  let state = rootReducer(initialState, { type: "__INIT__" });

  const subscribers: Function[] = [];

  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub());
    },

    subscribe(callback) {
      subscribers.push(callback);
      return () => subscribers.pop();
    },

    getState() {
      return state;
    },

    replaceReducer(nextReducer) {
      rootReducer = nextReducer;
    },
  };
}
