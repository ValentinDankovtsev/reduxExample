import { applyMiddleware } from "./applymiddleware";
import { createStore } from "../createStore";
import { rootReducer } from "../redux/rootReducer";

describe("applyMiddleware", () => {
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
    const store = createStoreWithMiddleware(rootReducer, 2);
    store.dispatch(someStrangeAction() as Action);
    expect(store.getState()).toEqual(1);
  });
  it(" applyMiddleware test promise", async () => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    const store = createStoreWithMiddleware(rootReducer, 5);
    await store.dispatch(someStrangeAction() as Action);
    expect(store.getState()).toEqual(6);
  });
});
