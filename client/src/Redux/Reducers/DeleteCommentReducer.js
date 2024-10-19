import { DELETE_COMMENT, DELETE_COMMENT_ERROR, DELETE_COMMENT_REQUEST } from "../Actions/DeleteCommentAction";

const InitialData = {
    DeleteCommentMessage: null,
    DeleteCommentLoading: false,
    DeleteCommentError: null
}

export const DeleteCommentReducer = (state = InitialData, action) => {
    switch (action.type) {
        case DELETE_COMMENT:
            return {
                ...state,
                DeleteCommentMessage: action.payload,
                DeleteCommentLoading: false,
                DeleteCommentError: null
            }
        case DELETE_COMMENT_REQUEST:
            return {
                ...state,
                DeleteCommentLoading: true,
                DeleteCommentError: null
            }
        case DELETE_COMMENT_ERROR:
            return {
                ...state,
                DeleteCommentLoading: false,
                DeleteCommentError: action.payload
            }

        default:
            return state
    }
}