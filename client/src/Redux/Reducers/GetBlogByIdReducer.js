import {
  GET_BLOG_BY_ID,
  GET_BLOG_BY_ID_ERROR,
  GET_BLOG_BY_ID_REQUEST,
} from "../Actions/GetBlogByIdAction";

const InitialData = {
  blogLoading: false,
  blogData: null,
  blogError: null,
};

export const GetBlogByIdReducer = (state = InitialData, action) => {
  switch (action.type) {
    case GET_BLOG_BY_ID_REQUEST:
      return {
        ...state,
        blogLoading: true,
        blogData: null,
        blogError: null,
      };
    case GET_BLOG_BY_ID:
      return {
        ...state,
        blogLoading: false,
        blogData: action.payload,
        blogError: null,
      };
    case GET_BLOG_BY_ID_ERROR:
      return {
        blogLoading: false,
        blogError: action.payload,
      };

    default:
      return state;
  }
};
