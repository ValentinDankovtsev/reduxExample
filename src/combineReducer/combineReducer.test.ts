import {combineReducers} from './combineReducer';
import {rootReducer,multplyReducer,addToDo} from '../redux/rootReducer'
import {createStore} from '../createStore'



describe('test1',()=>{
    it('combineReducer test',()=>{
        // const reducer = combineReducers({
        //     first: (state = 1) => state,
        //     two: (state = 2) => state,
        //   });
        //   expect(reducer({ type: '__INIT__' })).toEqual({"first": 1, "two": 2})

        
        const store=createStore(combineReducers({ a: rootReducer, b: addToDo }), 0);
        console.log('store',store.getState())

        store.dispatch({ type: "ADD" });
        console.log(store.getState())
        expect(store.getState().a).toBe();


})
})