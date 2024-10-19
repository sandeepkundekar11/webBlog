import { BASE_URL } from "../../Constants"

export const PROFILE_IMAGE = "PROFILE_IMAGE"

const GetProfileImageAction = (info) => {
    return {
        type: PROFILE_IMAGE,
        payload: info
    }
}

// get profile api call

export const getProfileImageApiCall = () => {
    return async (Dispacth) => {
        let userID = JSON.parse(localStorage.getItem("user"))?._id
        let token = localStorage.getItem("token")
        fetch(`${BASE_URL}/blog/getProfile/${userID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            Dispacth(GetProfileImageAction(data?.profile))

        })
    }
}