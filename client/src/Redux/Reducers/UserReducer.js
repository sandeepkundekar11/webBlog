import { JOIN_USER, REQUEST_USER, USER_ERROR } from "../Actions/UserAction";

const InitialState = {
    UserLoading: false,
    UserState: null,
    UserError: null
}

 export const UserReducer = (state = InitialState, action) => {
    switch (action.type) {
        case REQUEST_USER: return {
            ...state,
            UserLoading: true,
            UserState: null,
            UserError: null
        }
        case JOIN_USER: return {
            ...state,
            UserLoading: false,
            UserState: action.payload,
        }
        case USER_ERROR: return {
            ...state,
            UserLoading: false,
            UserError: action.payload
        }

        default:
            return state
    }
}
