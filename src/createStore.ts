/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export declare type Action = {
  type: string;
};

export type State = any;
export type Reducer = (state: State | undefined, action: Action) => State;
export type IStore = {
  dispatch(action: Action):void;
  subscribe(callback: Function):Function;
  getState():State;
  replaceReducer(nextReducer: Reducer):void;
}

export type Store = any;


// eslint-disable-next-line @typescript-eslint/ban-types
export function createStore(rootReducer: Reducer, initialState?: State): IStore {
  let state = rootReducer(initialState, { type: "__INIT__" });

  const subscribers: any[] = [];

  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub());
    },

    subscribe(callback) {
      subscribers.push(callback);
      return () => subscribers.splice(0);
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
