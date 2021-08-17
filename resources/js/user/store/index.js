import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./root-reducers";

export default createStore(rootReducers, applyMiddleware(thunk))
