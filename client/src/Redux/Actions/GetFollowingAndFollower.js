import { BASE_URL } from "../../Constants"

export const GET_FOLLOWING_FOLLOWERS = "GET_FOLLOWING_FOLLOWERS"
export const GET_FOLLOWING_FOLLOWERS_REQUEST = "GET_FOLLOWING_FOLLOWERS_REQUEST"
export const GET_FOLLOWING_FOLLOWERS_ERROR = "GET_FOLLOWING_FOLLOWERS_ERROR"

const getFollowerFollowingAction = (data) => {
    return {
        type: GET_FOLLOWING_FOLLOWERS,
        payload: data
    }
}

const getFollowerFollowingRequestAction = () => {
    return {
        type: GET_FOLLOWING_FOLLOWERS_REQUEST
    }
}

const getFollowerFollowingErrorAction = (err) => {
    return {
        type: GET_FOLLOWING_FOLLOWERS_ERROR,
        payload: err
    }
}

//calling the api to get all followers and following of users

export const GetFollowingFollowersApiCall = (userId) => {
    return async (Dispatch) => {
        try {
            Dispatch(getFollowerFollowingRequestAction())
            let token = localStorage.getItem("token")
            let response = await fetch(`${BASE_URL}/blog/followingAndFollowersList/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data) {
                Dispatch(getFollowerFollowingAction(data))
            }
            else {
                Dispatch(getFollowerFollowingErrorAction(data?.message))
            }
        } catch (error) {
            Dispatch(getFollowerFollowingErrorAction(error?.message))
        }
    }
}