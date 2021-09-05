import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from '../Reducer/Reducer';

const initialState = {
    Date: [],
    Reviews2: [],
    Reviews4: [],
    Questions: [],
    monthDiff: null
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));