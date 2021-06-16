import { State, Reducer, Action } from "../types";

export function applyMiddleware(middleware: Function) {
  return function createStoreWithMiddleware(createStore: Function): Function {
    return (reducer: Reducer, state: State) => {
      const store = createStore(reducer, state);

      return {
        dispatch: (action: Action) => middleware(store)(store.dispatch)(action),
        getState: store.getState,
      };
    };
  };
}
