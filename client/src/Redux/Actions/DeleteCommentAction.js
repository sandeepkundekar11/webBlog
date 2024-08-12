import { BASE_URL } from "../../Constants"

export const DELETE_COMMENT = "DELETE_COMMENT"
export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST"
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR"


const deleteCommentAction = (message) => {
    return {
        type: DELETE_COMMENT,
        payload: message
    }
}

const deleteCommentRequestAction = () => {
    return {
        type: DELETE_COMMENT_REQUEST
    }
}

const deleteCommentErrorAction = (err) => {
    return {
        type: DELETE_COMMENT_ERROR,
        payload: err
    }
}


// calling the Delete comment Api

export const DeleteCommentApiCall = (blogId, CommentIdTOBeDelete, toaster) => {
    return async (Dispatch) => {
        try {
            Dispatch(deleteCommentRequestAction())
            let token = localStorage.getItem("token")
            let response = await fetch(`${BASE_URL}/blog/DeleteComment?BlogId=${blogId}&CommentId=${CommentIdTOBeDelete}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data.message) {
                Dispatch(deleteCommentAction(data.message))
                toaster(data.message)
            }
            else {
                Dispatch(deleteCommentErrorAction(data.error))
            }
        } catch (error) {
            Dispatch(deleteCommentErrorAction(error.message))
        }
    }
}