import { GET_ALL_COMMENT, GET_ALL_COMMENT_ERROR, GET_ALL_COMMENT_REQUEST, GET_ALL_LIKES, GET_ALL_LIKES_ERROR, GET_ALL_LIKES_REQUEST } from "../Actions/GetCommentsAndLikesAction";

// initialData for the Comments array
const CommentInitialData = {
     blogComments: null,
     blogCommentsLoading: false,
     blogCommentsError: null
}

// initialData for the Likes Array

const LikesInitialData = {
     blogLikes: null,
     blogLikesLoading: false,
     blogLikesError: null
}

// reducer for the get Blog Comments

export const GetBlogCommentsReducer = (state = CommentInitialData, action) => {
     switch (action.type) {
          case GET_ALL_COMMENT:
               return {
                    ...state,
                    blogComments: action.payload,
                    blogCommentsLoading: false,
                    blogCommentsError: null
               }
          case GET_ALL_COMMENT_REQUEST:
               return {
                    ...state,
                    blogComments: null,
                    blogCommentsLoading: true,
                    blogCommentsError: null
               }
          case GET_ALL_COMMENT_ERROR:
               return {
                    ...state,
                    blogComments: null,
                    blogCommentsLoading: false,
                    blogCommentsError: action.payload
               }

          default: return state
     }
}


// reducer for the get blog likes

export const GetBlogsLikesReducer = (state = LikesInitialData, action) => {
     switch (action.type) {
          case GET_ALL_LIKES:
               return {
                    ...state,
                    blogLikes: action.payload,
                    blogLikesLoading: false,
                    blogLikesError: null

               }
          case GET_ALL_LIKES_REQUEST:
               return {
                    ...state,
                    blogLikes: null,
                    blogLikesLoading: true,
                    blogLikesError: null
               }
          case GET_ALL_LIKES_ERROR:
               return {
                    ...state,
                    blogLikesLoading: false,
                    blogLikesError: action.payload
               }
          default: return state
     }
}