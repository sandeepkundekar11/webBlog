import { GET_USER_INFO, GET_USER_INFO_ERROR, GET_USER_INFO_REQUEST } from "../Actions/UserProfileAction";

const InitialData = {
    ProfileData: null,
    ProfileLoading: false,
    ProfileError: null
}

export const GetProfileReducer = (state = InitialData, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                ProfileData: action.payload,
                ProfileLoading: false,
                ProfileError: null
            }
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                ProfileData: null,
                ProfileLoading: true,
                ProfileError: null
            }
        case GET_USER_INFO_ERROR:
            return {
                ...state,
                ProfileData: null,
                ProfileLoading: false,
                ProfileError: action.payload
            }

        default: return state
    }
}