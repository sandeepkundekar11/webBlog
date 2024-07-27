export const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW"
export const FOLLOW_UNFOLLOW_REQUEST = "FOLLOW_UNFOLLOW_REQUEST"
export const FOLLOW_UNFOLLOW_ERROR = "FOLLOW_UNFOLLOW_ERRORS"


const followUnfollowAction = (message) => {
    return {
        type: FOLLOW_UNFOLLOW,
        payload: message
    }
}

const followUnfollowRequestAction = () => {
    return {
        type: FOLLOW_UNFOLLOW_REQUEST
    }
}

const followUnfollowErrorAction = (error) => {
    return {
        type: FOLLOW_UNFOLLOW_ERROR,
        payload: error
    }
}

// calling the follow and unfollow api

export const followUnfollowApiCall = (followerId, userId, successToster) => {
    return async (Dispatch) => {
        try {
            Dispatch(followUnfollowRequestAction())
            let token = localStorage.getItem("token")
            let response = await fetch(`http://localhost:8000/blog/followAndUnfollow/${followerId}/${userId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            let data = await response.json()
            if (data.message) {
                Dispatch(followUnfollowAction(data.message))
                successToster(data.message)
            }
            else {
                Dispatch(followUnfollowErrorAction(data.error))
            }
        } catch (error) {
            Dispatch(followUnfollowErrorAction(error.message))
        }
    }
}