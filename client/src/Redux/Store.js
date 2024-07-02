import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import { UserReducer } from "./Reducers/UserReducer"

const rootStore = combineReducers({
    user: UserReducer
})

const store = createStore(rootStore, applyMiddleware(thunk))
export default store