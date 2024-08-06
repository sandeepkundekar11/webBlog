export const UPDATEBLOG_REQUEST = "UPDATE_BLOG_REQUEST"
export const UPDATEBLOG = "UPDATE_BLOG"
export const UPDATE_BLOG_ERROR = "UPDATE_BLOG_ERROR"

const UpdateBlogAction = (payload) => {
    return {
        type: UPDATEBLOG,
        payload: payload
    }
}

const UpdateBlogRequestAction = () => {
    return {
        type: UPDATEBLOG_REQUEST
    }
}

const UpadteBlogErrorAction = (err) => {
    return {
        type: UPDATE_BLOG_ERROR,
        payload: err
    }
}


// calling the update blog blog


export const UpdateBlogApiCall = (blogId, formData, successToaster) => {
    return async (Dispatch) => {
        try {
            Dispatch(UpdateBlogRequestAction())
            let token = localStorage.getItem("token")
            let response = await fetch(`http://localhost:8000/blog/updateBlog/${blogId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token} `
                },
                body: formData
            })
            let data = await response.json()
            if (data.message) {
                Dispatch(UpdateBlogAction(data?.message))
                successToaster(data.message)
            }
            else {
                Dispatch(UpadteBlogErrorAction(data?.error))
            }
        } catch (error) {
            Dispatch(UpadteBlogErrorAction(error?.message))
        }
    }
}