export const REQUEST_ALL_BLOGS = "REQUEST_ALL_BLOGS";
export const GET_ALL_BLOGS = "GET_ALL_BLOGS"
export const GET_BLOG_ERROR = "BLOG_ERROR"

const GetBlogRequestAction = () => {
    return {
        type: REQUEST_ALL_BLOGS
    }
}

const GetAllBlogsAction = (blogs) => {
    return {
        type: GET_ALL_BLOGS,
        payload: blogs
    }
}

const GetAllBlogErrorAction = (err) => {
    return {
        type: GET_BLOG_ERROR,
        payload: err
    }
}


// calling the Get All blog Api

export const GetAllBlogsApiCall = () => {
    return async (Dispatch) => {
        try {
            // dispatching the Request
            Dispatch(GetBlogRequestAction())
            let Token = localStorage.getItem("token")
            // calling get all blogs api
            let response = await fetch("http://localhost:8000/blog/allBlog", {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            })
            let data = await response.json()
            if (data.blogs) {
                // dispatching GetAllBlog  Action
                Dispatch(GetAllBlogsAction(data.blogs))
            }
            else {
                // dispatching the error action
                Dispatch(GetAllBlogErrorAction(data.message))
            }
        } catch (error) {
            // dispatching the error action
            Dispatch(GetAllBlogErrorAction(error))
        }
    }
}
