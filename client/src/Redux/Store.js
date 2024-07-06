import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import { AddBlogReducer } from "./Reducers/AddBlogReducer"
import { UserReducer } from "./Reducers/UserReducer"

const rootStore = combineReducers({
    user: UserReducer,
    addBlog:AddBlogReducer
})

const store = createStore(rootStore, applyMiddleware(thunk))
export default store