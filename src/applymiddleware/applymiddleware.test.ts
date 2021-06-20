import { applyMiddleware } from "./applymiddleware";
import { createStore } from "../createStore";
import { rootReducer } from "../redux/rootReducer";

describe("applyMiddleware real one parametr", () => {
  const thunk = (store: { dispatch: any; getState: any }) => (
    dispatch: (arg0: any) => any
  ) => (action: (arg0: any, arg1: any) => any) => {
    if (typeof action === "function") {
      return action(store.dispatch, store.getState);
    }
    return dispatch(action);
  };

  function someStrangeAction() {
    return async function (
      dispatch: (arg0: { type: string }) => void,
      getState: () => number
    ) {
      if (getState() % 2 === 0) {
        dispatch({
          type: "DECREMENT",
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch({
        type: "INCREMENT",
      });
    };
  }

  it(" applyMiddleware test", () => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    const store = createStoreWithMiddleware(rootReducer, 2, undefined);
    store.dispatch(someStrangeAction() as Function);
    expect(store.getState()).toEqual(1);
  });
  it(" applyMiddleware test promise", async () => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    const store = createStoreWithMiddleware(rootReducer, 5, undefined);
    await store.dispatch(someStrangeAction() as Function);
    expect(store.getState()).toEqual(6);
  });

  it(" tests some middlewares mocks", () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const logger1 = jest.fn().mockImplementation(() => spy);
    const thunk1 = jest.fn().mockImplementation(() => spy2);
    const createStoreWithMiddleware = applyMiddleware(
      logger1,
      thunk1
    )(createStore);
    createStoreWithMiddleware(rootReducer, {});
    expect(logger1).toBeCalled();
    expect(thunk1).toBeCalled();
  });
});
