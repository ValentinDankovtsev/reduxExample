import { combineReducers } from "./combineReducer";
import { rootReducer, addToDo } from "../redux/rootReducer";
import { createStore } from "../createStore";

describe("test1", () => {
  it("combineReducer test", () => {
    const reducer = combineReducers({
      first: (state = 1) => state,
      two: (state = 2) => state,
    });
    expect(reducer({ type: "__INIT__" })).toEqual({ first: 1, two: 2 });

    const store = createStore(
      combineReducers({ a: addToDo, b: rootReducer }),
      []
    );

    store.dispatch({ type: "ADD_TODO", text: "learn Redax" });
    expect(store.getState()).toEqual({ a: ["learn Redax"], b: 0 });
    expect(store.getState().a).toEqual(["learn Redax"]);
    expect(store.getState().b).toBe(0);
    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toEqual({ a: [], b: 1 });
    expect(store.getState().a).toEqual([]);
    expect(store.getState().b).toBe(1);
    store.dispatch({ type: "INCREMENT" });
    expect(store.getState().b).toBe(2);
  });
});
