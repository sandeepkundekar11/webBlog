import { BASE_URL } from "../../Constants"

// for Comments
export const GET_ALL_COMMENT = "GET_ALL_COMMENTS"
export const GET_ALL_COMMENT_REQUEST = "GET_ALL_COMMENT_REQUEST"
export const GET_ALL_COMMENT_ERROR = "GET_ALL_COMMENT_ERROR"

const getAllCommentsAction = (comments) => {
    return {
        type: GET_ALL_COMMENT,
        payload: comments
    }
}

const getAllCommentsRequestAction = () => {
    return {
        type: GET_ALL_COMMENT_REQUEST
    }
}

const getAllCommentsErrorAction = (err) => {
    return {
        type: GET_ALL_COMMENT_ERROR,
        payload: err
    }
}


// calling the get all comments of particular blog

export const getAllCommentApiCall = (blogId) => {
    return async (Dispatch) => {

        try {
            Dispatch(getAllCommentsRequestAction())
            let token = localStorage.getItem("token")
            let response = await fetch(`${BASE_URL}/blog/getCommentAndLikes/${blogId}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "type": "comments"
                })
            })

            let data = await response.json()
            if (data.comments) {
                Dispatch(getAllCommentsAction(data.comments))
            }
            else {
                Dispatch(getAllCommentsErrorAction(data.error))
            }
        } catch (error) {
            Dispatch(getAllCommentsErrorAction(error))
            console.log(error)
        }
    }
}



// for likes

export const GET_ALL_LIKES = "GET_ALL_LIKES";
export const GET_ALL_LIKES_REQUEST = "GET_ALL_LIKES_REQUEST"
export const GET_ALL_LIKES_ERROR = 'GET_ALL_LIKES_ERROR'

const getAllLikesAction = (likes) => {
    return {
        type: GET_ALL_LIKES,
        payload: likes
    }
}

const getAllLikesRequestAction = () => {
    return {
        type: GET_ALL_LIKES_REQUEST
    }
}

const getAllLikesErrorAction = (err) => {
    return {
        type: GET_ALL_LIKES_ERROR,
        payload: err
    }
}


// get all likes Array api call

export const GetAllLikesApiCall = (blog_id) => {
    return async (Dispatch) => {
        Dispatch(getAllLikesRequestAction())
        let token = localStorage.getItem("token")
        try {
            let response = await fetch(`${BASE_URL}/blog/getCommentAndLikes/${blog_id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "type": "likes"
                })
            })

            let data = await response.json()
            if (data.likes) {
                Dispatch(getAllLikesAction(data.likes))
            }
            else {
                Dispatch(getAllLikesErrorAction(data.error))
            }
        } catch (error) {
            Dispatch(getAllLikesErrorAction(error))
        }
    }
}