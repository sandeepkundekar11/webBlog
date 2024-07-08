import { ADD_BLOG, ADD_BLOG_ERROR, ADD_BLOG_REQUEST } from "../Actions/AddblogAction"

const InitialState = {
    addBlogLoading: false,
    addBlogMessage: null,
    addBlogError: null
}

export const AddBlogReducer = (state = InitialState, action) => {
    switch (action.type) {
        case ADD_BLOG_REQUEST:
            return {
                ...state,
                addBlogLoading: true,
                addBlogMessage: null,
                addBlogError: null
            }
        case ADD_BLOG:
            return {
                ...state,
                addBlogLoading: false,
                addBlogMessage: action.payload,
                addBlogError: null
            }
        case ADD_BLOG_ERROR:
            return {
                ...state,
                addBlogLoading: false,
                addBlogMessage: null,
                addBlogError: action.payload
            }

        default: return state
    }
}