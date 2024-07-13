export const GET_BLOG_BY_ID = "GET_BLOG_BY_ID";
export const GET_BLOG_BY_ID_REQUEST = "GET_BLOG_BY_ID_REQUEST"
export const GET_BLOG_BY_ID_ERROR = "GET_BLOG_BY_ID_ERROR";

const getBlogByIdRequestAction = () => {
    return {
        type: GET_BLOG_BY_ID_REQUEST
    }
}

const getBlogByIdAction = (blog) => {
    return {
        type: GET_BLOG_BY_ID,
        payload: blog
    }
}

const getBlogByIdErrorAction = (err) => {
    return {
        type: GET_BLOG_BY_ID_ERROR,
        payload: err
    }
}



// calling the get blog by id api

export const getBlogByIdApiCall = (id) => {
    return async (Dispatch) => {
        // dispatching the getBlogByIdRequestAction
        Dispatch(getBlogByIdRequestAction())
        // getting token from local storage
        let token = localStorage.getItem("token")
        try {
            // calling the get  blog by id api
            let response = await fetch(`http://localhost:8000/blog/getBlog/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data.blog) {
                // dispatching the getBlogByIdAction method
                Dispatch(getBlogByIdAction(data.blog))
            }
            else {

                // Dispatching the getBlogByIdErrorAction method
                Dispatch(getBlogByIdErrorAction(data.message))
            }
        } catch (error) {
            // Dispatching the getBlogByIdErrorAction method
            Dispatch(getBlogByIdErrorAction(error))
        }
    }
}