import {
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  ADD_COMMENT_REQUEST,
} from "../Actions/AddCommentAction";

const InitialData = {
  addCommentMessage: null,
  addCommentLoading: false,
  addCommentError: null,
};

export const addCommentReducer = (state = InitialData, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        addCommentMessage: action.payload,
        addCommentLoading: false,
        addCommentError: null,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentMessage: null,
        addCommentLoading: true,
        addCommentError: null,
      };
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        addCommentMessage: null,
        addCommentLoading: false,
        addCommentError: action.payload,
      };

    default:
      return state;
  }
};
