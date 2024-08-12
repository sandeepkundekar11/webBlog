import { BASE_URL } from "../../Constants"

export const GET_LIKES = "GET_LIKES"
export const GET_LIKE_REQUEST = "GET_LIKES_REQUEST"
export const GET_LIKES_ERROR = "GET_LIKES_ERROR"

const getLikesAction = (message) => {
    return {
        type: GET_LIKES,
        payload: message
    }
}

const getLikesLoadingAction = () => {
    return {
        type: GET_LIKE_REQUEST
    }
}

const getLikesErrorAction = (err) => {
    return {
        type: GET_LIKES_ERROR,
        payload: err
    }
}

// calling the Like api

export const getLikesApiCall = (Post_id,success) => {
    return async (Dispatch) => {
        Dispatch(getLikesLoadingAction())
        let token = localStorage.getItem("token")
        try {
            let response = await fetch(`${BASE_URL}/blog/likeDislike/${Post_id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data.message) {
                Dispatch(getLikesAction(data.message))
                success(data.message)
            }
            else {
                Dispatch(getLikesErrorAction(data.message))
            }

        } catch (error) {
            Dispatch(getLikesErrorAction(error))
        }
    }
}