import { GET_LIKE_REQUEST, GET_LIKES, GET_LIKES_ERROR } from "../Actions/AddLikeAction";

const InitialData = {
    likesMessage: null,
    likesLoading: false,
    likesError: false
}

export const AddLikesReducer = (state = InitialData, action) => {
    switch (action.type) {
        case GET_LIKES:
            return {
                ...state,
                likesMessage: action.payload,
                likesLoading: false,
                likesError: false
            }
        case GET_LIKE_REQUEST:
            return {
                ...state,
                likesMessage: null,
                likesLoading: true,
                likesError: false
            }
        case GET_LIKES_ERROR:
            return {
                ...state,
                likesLoading: false,
                likesError: action.payload
            }

        default: return state
    }
}