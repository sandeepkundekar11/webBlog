import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { AddBlogReducer } from "./Reducers/AddBlogReducer";
import { GetAllblogsReducer } from "./Reducers/GetAllBlogAction";
import { UserReducer } from "./Reducers/UserReducer";
import { GetBlogByIdReducer } from "./Reducers/GetBlogByIdReducer";
import { addCommentReducer } from "./Reducers/AddCommentReducer";

const rootStore = combineReducers({
  user: UserReducer,
  addBlog: AddBlogReducer,
  allBlogs: GetAllblogsReducer,
  blogById: GetBlogByIdReducer,
  addComment: addCommentReducer,
});

const store = createStore(rootStore, applyMiddleware(thunk));
export default store;
