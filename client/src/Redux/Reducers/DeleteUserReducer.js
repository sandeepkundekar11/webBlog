import { DELETE_USER, DELETE_USER_ERROR, DELETE_USER_REQUET } from "../Actions/DeleteUserAction";

const InitialData = {
    deleteUserMessage: null,
    deleteUserLoading: false,
    deleteUserErr: null
}

export const DeleteUserReducer = (state = InitialData, action) => {
    switch (action.type) {
        case DELETE_USER:
            return {
                ...state,
                deleteUserMessage: action.payload,
                deleteUserLoading: false,
                deleteUserErr: null
            }
        case DELETE_USER_REQUET:
            return {
                ...state,
                deleteUserLoading: true,
                deleteUserErr: null
            }
        case DELETE_USER_ERROR:
            return {
                ...state,
                deleteUserLoading: false,
                deleteUserErr: action.payload
            }

        default: return state
    }

}