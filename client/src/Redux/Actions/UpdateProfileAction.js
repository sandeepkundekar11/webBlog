export const UPADTE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

const updateProfileAction = (message) => {
  return {
    type: UPADTE_PROFILE,
    payload: message,
  };
};

const updateProfileRequestAction = () => {
  return {
    type: UPDATE_PROFILE_REQUEST,
  };
};

const updateProfileErrorAction = (err) => {
  return {
    type: UPDATE_PROFILE_ERROR,
    payload: err,
  };
};

// calling the update profile api

export const updateProfileApiCall = (updateProfileData, success) => {
  return async (Dispatch) => {
    let token = localStorage.getItem("token");
    try {
      Dispatch(updateProfileRequestAction());
      let response = await fetch("http://localhost:8000/blog/updeteProfile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updateProfileData,
      });

      let data = await response.json();
      if (data.message) {
        Dispatch(updateProfileAction(data.message));
        success(data.message);
      } else {
        Dispatch(updateProfileErrorAction(data.error));
      }
    } catch (error) {
      Dispatch(updateProfileErrorAction(error.message));
    }
  };
};
