import { FOLLOW_UNFOLLOW, FOLLOW_UNFOLLOW_ERROR, FOLLOW_UNFOLLOW_REQUEST } from "../Actions/FollowAndUnfollowAction";

const InitialData = {
    FollowInfollowMessage: null,
    FollowUnfollowLoading: false,
    FollowUnfollowError: null
}

export const FollowUnFollowReducer = (state = InitialData, action) => {
    switch (action.type) {
        case FOLLOW_UNFOLLOW:
            return {
                ...state,
                FollowInfollowMessage: action.payload,
                FollowUnfollowLoading: false,
                FollowUnfollowError: null
            }
        case FOLLOW_UNFOLLOW_REQUEST:
            return {
                ...state,
                FollowUnfollowLoading: true,
                FollowUnfollowError: null
            }
        case FOLLOW_UNFOLLOW_ERROR:
            return {
                ...state,
                FollowInfollowMessage: null,
                FollowUnfollowLoading: false,
                FollowUnfollowError: action.payload
            }

        default: return state
    }
}