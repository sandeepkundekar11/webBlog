import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { AddBlogReducer } from "./Reducers/AddBlogReducer";
import {
  GetBlogCommentsReducer,
  GetBlogsLikesReducer,
} from "./Reducers/AddCommentAndLikeReducer";
import { addCommentReducer } from "./Reducers/AddCommentReducer";
import { AddLikesReducer } from "./Reducers/AddLikesReducer";
import { DeleBlogReducer } from "./Reducers/DeleteBlogReducer";
import { GetAllblogsReducer } from "./Reducers/GetAllBlogAction";
import { GetBlogByIdReducer } from "./Reducers/GetBlogByIdReducer";
import { GetProfileReducer } from "./Reducers/UserProfileReducer";
import { UserReducer } from "./Reducers/UserReducer";
import { UpdateProfileReducer } from "./Reducers/UpdateProfileReducer";

const rootStore = combineReducers({
  user: UserReducer,
  addBlog: AddBlogReducer,
  allBlogs: GetAllblogsReducer,
  blogById: GetBlogByIdReducer,
  addComment: addCommentReducer,
  getBlogComment: GetBlogCommentsReducer,
  getBlogLikes: GetBlogsLikesReducer,
  addLikes: AddLikesReducer,
  UserInfo: GetProfileReducer,
  deleteBlog: DeleBlogReducer,
  UpdateProfile: UpdateProfileReducer,
});

const store = createStore(rootStore, applyMiddleware(thunk));
export default store;
