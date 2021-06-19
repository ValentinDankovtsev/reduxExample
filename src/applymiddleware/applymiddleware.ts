import { State, Reducer, Action } from "../types";

export function compose(...args: any[]): any {
  return args.reduce((acc: any, fn: any): any => (...funArgs: any[]) =>
    acc(fn(...funArgs))
  );
}

export function applyMiddleware(...middlewares: any[]): any {
  return (createStore: Function) => (
    reducer: Reducer,
    preloadedState: State,
    enchancer: any
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
