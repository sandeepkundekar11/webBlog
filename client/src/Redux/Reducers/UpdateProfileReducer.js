import {
  UPADTE_PROFILE,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
} from "../Actions/UpdateProfileAction";

const InitialData = {
  UpdateProfileMessage: null,
  UpdateProfileLoading: false,
  UpadateProfileError: null,
};

export const UpdateProfileReducer = (state = InitialData, action) => {
  switch (action.type) {
    case UPADTE_PROFILE:
      return {
        ...state,
        UpdateProfileMessage: action.payload,
        UpdateProfileLoading: false,
        UpadateProfileError: null,
      };
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        UpdateProfileLoading: true,
        UpadateProfileError: null,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        UpdateProfileLoading: false,
        UpadateProfileError: action.payload,
      };

    default:
      return state;
  }
};
