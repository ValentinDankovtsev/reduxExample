/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export declare type Action = {
  type: string;
};

export type State = any;

export type Store = any;

export type Reducer = (state: State | undefined, action: Action) => State;
// eslint-disable-next-line @typescript-eslint/ban-types
export function createStore(rootReducer: Reducer, initialState?: State): Store {
  let state = rootReducer(initialState, { type: "__INIT__" });

  const subscribers: any[] = [];

  return {
    dispatch(action: Action) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub());
    },

    subscribe(callback: Function): Function {
      subscribers.push(callback);
      return () => subscribers.splice(0);
    },

    getState() {
      return state;
    },

    replaceReducer(nextReducer: Reducer) {
      // eslint-disable-next-line no-param-reassign
      rootReducer = nextReducer;
    },
  };
}
