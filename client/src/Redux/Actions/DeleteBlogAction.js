export const DELETE_BLOG = "DELETE_BLOG"
export const DELETE_BLOG_REQUEST = "DELETE_BLOG_REQUEST"
export const DELETE_BLOG_ERROR = "DELETE_BLOG_ERROR"

const deleteBlogAction = (message) => {
    return {
        type: DELETE_BLOG,
        payload: message
    }
}

const deleteBlogRequestAction = () => {
    return {
        type: DELETE_BLOG_REQUEST
    }
}

const deleteBlogErrAction = (err) => {
    return {
        type: DELETE_BLOG_ERROR,
        payload: err
    }
}


// calling the delete blog api

export const DeleteBlogApiCall = (blogId,navigate,id) => {
    return async (Dispatch) => {
        try {
            let token = localStorage.getItem("token")
            Dispatch(deleteBlogRequestAction())
            let response = await fetch(`http://localhost:8000/blog/deleteBlog/${blogId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data.message) {
                Dispatch(deleteBlogAction(data.message))
                navigate(`/profile/${id}`)
            }
            else {
                Dispatch(deleteBlogErrAction(data.message))
            }
        } catch (error) {
            Dispatch(deleteBlogErrAction(error.message))
        }
    }
}