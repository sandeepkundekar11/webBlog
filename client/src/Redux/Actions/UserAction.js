import { BASE_URL } from "../../Constants";

export const REQUEST_USER = "REQUEST_USER";
export const JOIN_USER = "JOIN_USER";
export const USER_ERROR = "USER_ERROR"

// request user action 
const RequestUser = () => {
    return {
        type: REQUEST_USER
    }
}

// join user action
const join_User = (data) => {
    return {
        type: JOIN_USER,
        payload: data
    }
}

// error user action
const User_Err = (err) => {
    return {
        type: USER_ERROR,
        payload: err
    }
}

// calling the signup api

export const SignupCall = (userData, Navigate) => {
    return async (Dispatch) => {
        // dispatching request
        Dispatch(RequestUser())
        try {
            // calling Signup Api
            let response = await fetch(`${BASE_URL}/blog/signup`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            let data = await response.json()
            if (data.user) {
                // dispatching
                Dispatch(join_User(data.user))
                // navigating to home page if we got data from backend
                Navigate("/")
                // storing all user data and auth token in to the data base
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("token", data.token)
            }
            else {
                Dispatch(User_Err(data.message))
            }

        } catch (error) {
            Dispatch(User_Err(error))
        }
    }
}

// calling the login api

export const LoginCall = (UserData, Navigate) => {
    return async (Dispatch) => {
        // dispatching request
        Dispatch(RequestUser())
        try {
            // calling login api
            let response = await fetch(`${BASE_URL}/blog/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(UserData)
            })

            let data = await response.json()
            if (data.user) {
                // Dispatching user data function form action
                Dispatch(join_User(data.user))
                // navigating to home page if we got data from backend
                Navigate("/")
                 // storing all user data and auth token in to the data base
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("token", data.token)
            }
            else {
                Dispatch(User_Err(data.message))
            }

        } catch (error) {
            Dispatch(User_Err(error))
        }
    }
}
