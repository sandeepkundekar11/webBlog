import { DELETE_BLOG, DELETE_BLOG_ERROR, DELETE_BLOG_REQUEST } from "../Actions/DeleteBlogAction";

const InitialData = {
    DeletedBlogMessage: null,
    DeleteBlogLoading: false,
    DeleteBlogError: null
}

export const DeleBlogReducer = (state = InitialData, action) => {
    switch (action.type) {
        case DELETE_BLOG:
            return {
                ...state,
                DeletedBlogMessage: action.payload,
                DeleteBlogLoading: false,
                DeleteBlogError: null
            }
        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                DeleteBlogLoading: true,
                DeleteBlogError: null
            }
        case DELETE_BLOG_ERROR:
            return {
                ...state,
                DeletedBlogMessage: null,
                DeleteBlogLoading: false,
                DeleteBlogError: action.payload
            }

        default: return state
    }
}