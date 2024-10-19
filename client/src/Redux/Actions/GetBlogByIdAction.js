import { BASE_URL } from "../../Constants";

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

export const getBlogByIdApiCall = (id, Navigate) => {
    return async (Dispatch) => {
        // dispatching the getBlogByIdRequestAction
        Dispatch(getBlogByIdRequestAction())
        // getting token from local storage
        let token = localStorage.getItem("token")
        try {
            // calling the get  blog by id api
            let response = await fetch(`${BASE_URL}/blog/getBlog/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data.blog === null) {
                // this logic is called when blog author delete the post and other person tries to access that blog
                Navigate("/noBlog")
            }
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