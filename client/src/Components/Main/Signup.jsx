import { useState } from "react"
import { NavLink } from "react-router-dom"
import CommanComponent from "../../helperComponents/CommanComponent"
const SignUp = () => {

    // Signup data state
    const [UserData, setUserData] = useState({
        fist_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    // signup warnings
    const [UserDataWaring, setUserDataWarning] = useState({
        fist_nameWarning: "",
        last_nameWarning: "",
        emailWarning: "",
        passwordWarning: ""
    })

    // setting the UserData value
    const HandleInput = (e) => {
        let { name, value } = e.target
        setUserData({
            ...UserData,
            [name]: value
        })
    }

    // show hide password
    const [showpassowrd, setshowPassword] = useState(false)
    const SubmitForm = () => {
        // initializing the demo warning
        let newWarning = {
            fist_nameWarning: "",
            last_nameWarning: "",
            emailWarning: "",
            passwordWarning: ""
        }
        // checking first name
        if (UserData.fist_name.length < 6) {
            newWarning.fist_nameWarning = "Fist name can't be less the 5 characters"
        }
        else {
            newWarning.fist_nameWarning = ""
        }

        // checking last name

        if (UserData.last_name.length < 6) {
            newWarning.last_nameWarning = "last name can't be less then 5 characters"
        }
        else {
            newWarning.last_nameWarning = ""
        }

        // checking email

        if (UserData.email.length < 6) {
            newWarning.emailWarning = "Email can't be less then 5 characters"
        }
        else {
            newWarning.emailWarning = ""
        }
        // checking the Password

        if (UserData.password.length < 6) {
            newWarning.passwordWarning = "Password can't be less then 5 characters"
        }
        else {
            newWarning.passwordWarning = ""
        }

        // setting new warning to userData warning
        setUserDataWarning(newWarning)

        if (Object.values(UserData).every((ele) => ele.length >= 6)) {
            // call api
        }


    }
    return (
        <>
            <CommanComponent heading="Get Started with Your Blog" subHeading="Nice to see you again"
                text="We're excited to have you join our community of passionate writers and readers. 
            Creating your blog is simple and free. Share your thought">
                <div className="w-full h-full pl-4">
                    <h1 className="text-3xl font-bold">Signup</h1>
                    <div className="w-full mt-3">
                        {/* first name */}
                        <p className="text-base">First Name</p>
                        {/* entering first name */}
                        <input type="text" onChange={HandleInput} name="fist_name" placeholder="First Name" className="w-11/12 h-9 mt-2 rounded-md outline-none pl-2 bg-transparent border border-gray-600" id="" />
                        {/* log the warning when user not enter first name enter invalid first name */}
                        <p className="warning text-red-600 text-sm">{UserDataWaring.fist_nameWarning}</p>
                    </div>

                    <div className="mt-3">
                        {/* last name */}
                        <p className="text-base">Last Name</p>
                        {/* entering last name */}
                        <input type="text" name="last_name" onChange={HandleInput} placeholder="Last Name" className="w-11/12 h-9 mt-2 rounded-md outline-none pl-2 bg-transparent border border-gray-600" id="" />
                        {/* log the warning when user not enter last or enter invalid last name */}
                        <p className="warning text-red-600 text-sm">{UserDataWaring.last_nameWarning}</p>
                    </div>

                    <div className="mt-3">
                        {/* email */}
                        <p className="text-base">Email Address</p>
                        {/* entering the email */}
                        <input type="email" name="email" onChange={HandleInput} placeholder="Email Address" className="w-11/12 h-9 mt-2 rounded-md outline-none pl-2 bg-transparent border border-gray-600" id="" />
                        {/* log the warning when user not enter email or enter invalid email */}
                        <p className="warning text-red-600 text-sm">{UserDataWaring.emailWarning}</p>
                    </div>
                    <div className="mt-3">
                        {/* password */}
                        <p className="text-base">Enter Password</p>
                        <div className="w-11/12 flex justify-center items-center p-1  bg-white px-2 h-9 rounded-md bg-transparent border border-gray-600 ">
                            {/* entering the password and show hiding the type of the password after clicking on show hide button */}
                            <input name="password" onChange={HandleInput} type={showpassowrd ? "password" : "text"} placeholder="Password" className=" w-full h-full  outline-none pl-2 bg-transparent" id="" />
                            <button onClick={() => setshowPassword(!showpassowrd)}>{showpassowrd ? "show" : "hide"}</button>
                        </div>
                        {/* if user user enter wrong or invalid password then log the warning */}
                        <p className="warning text-red-600 text-sm">{UserDataWaring.passwordWarning}</p>
                    </div>


                    <div className="signupBtns mt-4">
                        {/* submit button */}
                        <button className="w-11/12 text-white hover:bg-blue-700 h-11 bg-blue-600 rounded-lg shadow-md" onClick={SubmitForm}>
                            SignUp
                        </button>
                        <p className="warning text-red-600 text-sm"></p>
                    </div>

                    <span>Don't have an account ? <NavLink className="font-bold" to="/login"> Login</NavLink></span>
                </div>
            </CommanComponent>
        </>
    )
}
export default SignUp