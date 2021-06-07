import { createStore, Action } from "./createStore";

import { rootReducer, multplyReducer } from "./redux/rootReducer";

describe("test createStore implementation", () => {
  it("dispatch is work", () => {
    const store = createStore(rootReducer, 0);
    store.dispatch({ type: "INCREMENT" });
    let result = store.getState();
    expect(result).toBe(1);
    store.dispatch({ type: "DECREMENT" });
    result = store.getState();
    expect(result).toBe(0);
  });
  it("subscribe is work", () => {
    const store = createStore(rootReducer, 0);
    const spy = jest.fn();
    const unsubscribe = store.subscribe(spy);
    store.dispatch({ type: "INCREMENT" });
    unsubscribe();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("replaceReducer is work", () => {
    const store = createStore(rootReducer, 0);
    expect(store.getState()).toBe(0);
    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toBe(1);
    store.replaceReducer(multplyReducer);
    store.dispatch({ type: "MULTIPLY" });
    expect(store.getState()).toBe(5);
  });
});
