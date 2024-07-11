export const ADD_BLOG_REQUEST = "ADD_BLOG_REQUEST";
export const ADD_BLOG = "ADD_BLOG";
export const ADD_BLOG_ERROR = "ADD_BLOG_ERR";

// add blog request action
const addBlogRequestAction = () => {
  return {
    type: ADD_BLOG_REQUEST,
  };
};

// add blog action
const addBlogAction = (blog) => {
  return {
    type: ADD_BLOG,
    payload: blog,
  };
};

// add blog error action
const addBlogErrorAction = (error) => {
  return {
    type: ADD_BLOG_ERROR,
    payload: error,
  };
};

// add blog api call

export const addBlogApiCall = (blog, navigate, id) => {
  return async (Dispatch) => {
    try {
      // Dispatching the  add blog request action
      Dispatch(addBlogRequestAction());

      let token = localStorage.getItem("token");
      // calling the add blog api
      let response = await fetch("http://localhost:8000/blog/addBlog", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: blog,
      });

      let data = await response.json();
      console.log(data);
      if (data.message) {
        // dispatching the Add blog action
        Dispatch(addBlogAction(data.message));
        // navigating to the home page
        navigate(`/viewblog/${data?.blog_id}`);
      }
    } catch (error) {
      // if any error occurs then dispatching add blog error action
      Dispatch(addBlogErrorAction(error));
    }
  };
};
