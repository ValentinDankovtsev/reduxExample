import { State, Reducer, Action } from "../types";

export function compose(...args: Function[]): Function {
  return args.reduce((acc, fn) => (...funArgs: Function[]) =>
    acc(fn(...funArgs))
  );
}

export function applyMiddleware(...middlewares: Function[]): Function {
  return (createStore: Function) => (
    reducer: Reducer,
    preloadedState: State,
    enchancer: Function[]
  ) => {
    const store = createStore(reducer, preloadedState, enchancer);
    let { dispatch } = store;
    let chain = [];

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action: Action) => dispatch(action),
    };

    chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}
