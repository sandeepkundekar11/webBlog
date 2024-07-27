import { GET_FOLLOWING_FOLLOWERS, GET_FOLLOWING_FOLLOWERS_ERROR, GET_FOLLOWING_FOLLOWERS_REQUEST } from "../Actions/GetFollowingAndFollower";

const InitialData = {
    followingFollowerData: null,
    followingFollowerLoading: false,
    followingFollowerError: null
}

export const GetFollowerFollowingReducer = (state = InitialData, action) => {
    switch (action.type) {
        case GET_FOLLOWING_FOLLOWERS:
            return {
                ...state,
                followingFollowerData: action.payload,
                followingFollowerLoading: false,
                followingFollowerError: null
            }
        case GET_FOLLOWING_FOLLOWERS_REQUEST:
            return {
                ...state,
                followingFollowerLoading: true,
                followingFollowerError: null
            }
        case GET_FOLLOWING_FOLLOWERS_ERROR:
            return {
                ...state,
                followingFollowerLoading: false,
                followingFollowerError: action.payload
            }

        default:
            return state
    }
}