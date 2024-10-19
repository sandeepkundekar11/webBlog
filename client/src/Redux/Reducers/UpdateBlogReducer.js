import { UPDATE_BLOG_ERROR, UPDATEBLOG, UPDATEBLOG_REQUEST } from "../Actions/UpdateBlogAction";

const Initialdata = {
    UpdateBlogMessage: null,
    UpdateBlogLoading: false,
    UpdateBlogErr: null
}

export const UpadteBlogReducer = (state = Initialdata, action) => {
    switch (action.type) {
        case UPDATEBLOG_REQUEST:
            return {
                ...state,
                UpdateBlogLoading: true,
                UpdateBlogErr: null
            }
        case UPDATEBLOG:
            return {
                ...state,
                UpdateBlogMessage: action.payload,
                UpdateBlogLoading: false,
                UpdateBlogErr: null
            }
        case UPDATE_BLOG_ERROR:
            return {
                ...state,
                UpdateBlogLoading: false,
                UpdateBlogErr: action.payload
            }

        default: return state
    }
}