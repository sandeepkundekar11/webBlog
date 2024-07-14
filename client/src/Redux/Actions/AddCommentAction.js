export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_ERROR = "ADD_COMMENT_ERROR";

const addCommentAction = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  };
};

const addCommentRequestAction = () => {
  return {
    type: ADD_COMMENT_REQUEST,
  };
};

const addCommentErrorAction = (err) => {
  return {
    type: ADD_COMMENT_ERROR,
    payload: err,
  };
};

// calling the Add Comment api

export const addCommentApiCall = (PostId, comment,successToaster) => {
  return async (Dispatch) => {
    try {
      Dispatch(addCommentRequestAction());
      const token = localStorage.getItem("token");
      let response = await fetch(
        `http://localhost:8000/blog/comment?id=${PostId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
          }),
        }
      );

      let data = await response.json();
      if (data.message) {
        Dispatch(addCommentAction(data.message));
        successToaster(data.message)
      } else {
        Dispatch(addCommentErrorAction(data.error));
      }
    } catch (error) {
      Dispatch(addCommentErrorAction(error));
    }
  };
};
