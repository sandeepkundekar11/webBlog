import { PROFILE_IMAGE } from "../Actions/ProfileImageAction";

const InitialData = {
    ProfileData: null
}

export const ProfileImageData = (state = InitialData, action) => {
    switch (action.type) {
        case PROFILE_IMAGE:
            return {
                ...state,
                ProfileData: action.payload
            }

        default:
            return state
    }
}