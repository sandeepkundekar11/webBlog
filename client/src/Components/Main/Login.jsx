import { NavLink } from "react-router-dom"
import CommanComponent from "../../helperComponents/CommanComponent"

const Login = () => {
    return (
        <CommanComponent heading="Welcome Back, Blogger!" subHeading="Nice to see you again"
            text="Log in to access your personal dashboard, manage your posts, and stay connected with your readers.">
            <div className="w-full h-full pl-4">
                <h1 className="text-3xl font-bold">Login</h1>
                <div className="mt-8">
                    <p className="text-base">Email Address</p>
                    <input type="email" placeholder="Email Address" className="w-11/12 h-9 mt-3 rounded-md outline-none pl-2 bg-transparent border border-gray-600" name="" id="" />
                    <p className="warning text-red-600 text-sm"></p>
                </div>
                <div className="mt-8">
                    <p className="text-base">Enter Password</p>
                    <div className="w-11/12 flex justify-center items-center p-1 mt-3  bg-white px-2 h-9 rounded-md bg-transparent border border-gray-600 ">
                        <input type="password" placeholder="Password" className=" w-full h-full  outline-none pl-2 bg-transparent" name="" id="" />
                        <button>show</button>
                    </div>
                    <p className="warning text-red-600 text-sm"></p>
                </div>

                <div className="signupBtns mt-8">
                    <button className="w-11/12 text-white hover:bg-blue-700 h-11 bg-blue-600 rounded-lg shadow-md">
                        Login
                    </button>
                </div>

                <span className="">Already have an account ? <NavLink className="font-bold" to="/signup"> Signup</NavLink></span>
            </div>

        </CommanComponent>
    )
}
export default Login