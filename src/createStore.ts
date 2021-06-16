import { Reducer, State, IStore } from "./types";

export function createStore(rootReducer: Reducer, initialState: State): IStore {
  let state = rootReducer(initialState, { type: "__INIT__" });

  const subscribers: any[] = [];

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
      // eslint-disable-next-line no-param-reassign
      rootReducer = nextReducer;
    },
  };
}
