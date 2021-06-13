export function rootReducer(state = 1, action: Action): newState {
  let result = state;

  switch (action.type) {
    case "INCREMENT":
      result += 1;
      break;
    case "DECREMENT":
      result -= 1;
      break;

    case "SOME_ACTION_TYPE":
      setTimeout(() => {
        result -= 20;
      }, 1000);
      break;
    default:
      return state;
  }
  return result;
}

export function multplyReducer(state: State, action: Action): newState {
  let result = state;
  switch (action.type) {
    case "MULTIPLY":
      result *= 5;
      break;
    default:
      return result;
  }
  return result;
}

export function addToDo(state = [] as any, action: Action): State {
  let result = state;
  switch (action.type) {
    case "ADD_TODO":
      result.push(action.text);
      break;
    default:
      result = [];
  }
  return result;
}
