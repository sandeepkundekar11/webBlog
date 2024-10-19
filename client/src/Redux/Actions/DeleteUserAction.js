import { BASE_URL } from "../../Constants"

export const DELETE_USER = "DELETE_USER"
export const DELETE_USER_REQUET = "DELETE_USER_REQUEST"
export const DELETE_USER_ERROR = "DELETE_USER_ERROR"

const DeleteUserAction = (message) => {
    return {
        type: DELETE_USER,
        payload: message
    }
}
const DeleteUserRequestAction = () => {
    return {
        type: DELETE_USER_REQUET
    }
}

const DeleteUserErrAction = (err) => {
    return {
        type: DELETE_USER_ERROR,
        payload: err
    }
}

// delete user api call

export const DeleteUserApiCall = (SuccessToaster, navigate) => {
    return async (Dispatch) => {

        try {
            Dispatch(DeleteUserRequestAction())
            let token = localStorage.getItem("token")
            let response = await fetch(`${BASE_URL}/blog/deleteProfile`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data.message) {
                Dispatch(DeleteUserAction(data.message))
                SuccessToaster(data.message)
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setTimeout(() => {
                    navigate("/signup")
                }, 1000);
            }
            else {
                Dispatch(DeleteUserErrAction(data.error))
            }
        } catch (error) {
            Dispatch(DeleteUserErrAction(error))
        }
    }
}