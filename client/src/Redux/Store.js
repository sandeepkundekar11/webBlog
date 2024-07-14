import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { AddBlogReducer } from "./Reducers/AddBlogReducer";
import { GetBlogCommentsReducer, GetBlogsLikesReducer } from "./Reducers/AddCommentAndLikeReducer";
import { addCommentReducer } from "./Reducers/AddCommentReducer";
import { AddLikesReducer } from "./Reducers/AddLikesReducer";
import { GetAllblogsReducer } from "./Reducers/GetAllBlogAction";
import { GetBlogByIdReducer } from "./Reducers/GetBlogByIdReducer";
import { UserReducer } from "./Reducers/UserReducer";

const rootStore = combineReducers({
  user: UserReducer,
  addBlog: AddBlogReducer,
  allBlogs: GetAllblogsReducer,
  blogById: GetBlogByIdReducer,
  addComment: addCommentReducer,
  getBlogComment: GetBlogCommentsReducer,
  getBlogLikes: GetBlogsLikesReducer,
  addLikes: AddLikesReducer
});

const store = createStore(rootStore, applyMiddleware(thunk));
export default store;
