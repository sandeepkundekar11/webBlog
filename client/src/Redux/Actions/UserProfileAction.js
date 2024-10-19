import { BASE_URL } from "../../Constants";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST"
export const GET_USER_INFO_ERROR = "GET_USER_INFO_ERROR"

const getUserInfoAction = (data) => {
    return {
        type: GET_USER_INFO,
        payload: data
    }
}

const getUserInfoRequestAction = () => {
    return {
        type: GET_USER_INFO_REQUEST
    }
}

const getUserInfoErrorAction = (error) => {
    return {
        type: GET_USER_INFO_ERROR,
        payload: error
    }
}


// calling the get USer info api

export const GetUserInfoApiCall = (userId, Navigate) => {
    return async (Dispatch) => {
        try {
            let token = localStorage.getItem("token")
            Dispatch(getUserInfoRequestAction())
            let response = await fetch(`${BASE_URL}/blog/getProfile/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data.profile === null) {
                // this logic is called when blog author delete the profile and other person tries to access that persons profile
                Navigate("/ProfileDeleted")
            }
            if (data.profile) {
                Dispatch(getUserInfoAction(data.profile))
            }
            else {
                Dispatch(getUserInfoErrorAction(data.error))
            }
        } catch (error) {
            Dispatch(getUserInfoErrorAction(error))
        }
    }
}