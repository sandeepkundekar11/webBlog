import { GET_ALL_COMMENT, GET_ALL_COMMENT_ERROR, GET_ALL_COMMENT_REQUEST } from "../Actions/GetCommentsAndLikesAction";

const InitialData = {
     blogComments: null,
     blogCommentsLoading: false,
     blogCommentsError: null
}

export const GetBlogCommentsReducer = (state = InitialData, action) => {
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