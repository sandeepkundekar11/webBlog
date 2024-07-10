import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import { AddBlogReducer } from "./Reducers/AddBlogReducer"
import { GetAllblogsReducer } from "./Reducers/GetAllBlogAction"
import { UserReducer } from "./Reducers/UserReducer"

const rootStore = combineReducers({
    user: UserReducer,
    addBlog:AddBlogReducer,
    allBlogs:GetAllblogsReducer
})

const store = createStore(rootStore, applyMiddleware(thunk))
export default store