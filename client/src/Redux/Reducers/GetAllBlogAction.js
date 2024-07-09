import { ADD_BLOG_ERROR, ADD_BLOG_REQUEST } from "../Actions/AddblogAction";
import { GET_ALL_BLOGS } from "../Actions/GetAllBlogsAction";

const InitialData = {
    BlogsLoading: false,
    Allblogs: null,
    BlogsError: null
}

export const GetAllblogsReducer = (state = InitialData, action) => {
    switch (action.type) {
        case GET_ALL_BLOGS:
            return {
                ...state,
                BlogsLoading: false,
                Allblogs: action.payload,
                BlogsError: null
            }
        case ADD_BLOG_REQUEST:
            return {
                ...state,
                BlogsLoading: true,
                BlogsError: null
            }
        case ADD_BLOG_ERROR:
            return{
                ...state,
                BlogsLoading: false,
                BlogsError: action.payload
            }
        default:
            return state
    }
}