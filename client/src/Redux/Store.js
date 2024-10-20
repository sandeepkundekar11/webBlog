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
import { DeleteCommentReducer } from "./Reducers/DeleteCommentReducer";
import { DeleteUserReducer } from "./Reducers/DeleteUserReducer";
import { FollowUnFollowReducer } from "./Reducers/FollowAndUnfollowReducer";
import { GetAllblogsReducer } from "./Reducers/GetAllBlogAction";
import { GetBlogByIdReducer } from "./Reducers/GetBlogByIdReducer";
import { GetFollowerFollowingReducer } from "./Reducers/GetFollowerandFollowingReducer";
import { ProfileImageData } from "./Reducers/ProfileImagReducer";
import { UpadteBlogReducer } from "./Reducers/UpdateBlogReducer";
import { UpdateProfileReducer } from "./Reducers/UpdateProfileReducer";
import { GetProfileReducer } from "./Reducers/UserProfileReducer";
import { UserReducer } from "./Reducers/UserReducer";

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
  followUnfollow: FollowUnFollowReducer,
  getFollowingFollowerList: GetFollowerFollowingReducer,
  UpadteBlogInfo: UpadteBlogReducer,
  DeleteComment: DeleteCommentReducer,
  ProfileImage: ProfileImageData,
  DeleteUser: DeleteUserReducer
});

const store = createStore(rootStore, applyMiddleware(thunk));
export default store;
