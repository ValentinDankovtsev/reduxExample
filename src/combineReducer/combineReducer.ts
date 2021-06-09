/* eslint-disable @typescript-eslint/ban-types */
import {State,Action} from '../createStore';

type Reducers = {
    [key:string]:any;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function combineReducers(reducersMap:Reducers):(state?: State | undefined, action?: Action) => State {
return function combinationReducer(state?: State, action?: Action):State {
    const nextState = {} as State
    Object.entries(reducersMap).forEach(([key,reducer])=>{
        nextState[key]=reducer(state[key],action)
    })
    return nextState
}
}