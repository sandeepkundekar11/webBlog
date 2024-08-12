import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginCall } from "../../Redux/Actions/UserAction";
import CommanComponent from "../../helperComponents/CommanComponent";
import Loader from "../../helperComponents/Loader";

const Login = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const { UserLoading, UserState, UserError } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    // checking if user token is present the navigate home
    let token = localStorage.getItem("token");
    if (token) {
      Navigate("/");
    }
  }, []);
  // form data
  const [UserData, setUserData] = useState({
    email: "",
    password: "",
  });

  //   setting the warnings

  const [UserDataWarnings, setUserDataWarnings] = useState({
    emailWarning: "",
    passwordWarning: "",
  });
  //   show hide password
  const [showPassword, setShowPassword] = useState(false);

  //   setting the userData
  const HandleInput = (e) => {
    let { name, value } = e.target;
    setUserData({
      ...UserData,
      [name]: value,
    });
  };

  //   handling the Login fuction and checks the each input filed and if input fileds are not valid then throw an error
  const HandleLogin = () => {
    // setting the demo warning
    let newWarnings = {
      emailWarning: "",
      passwordWarning: "",
    };
    //  checking that user entered input or not
    // checking email
    if (UserData.email.length <= 5) {
      newWarnings.emailWarning = "Email can't be less the 5 characters";
    } else {
      newWarnings.emailWarning = "";
    }

    // checking password

    if (UserData.password.length <= 5) {
      newWarnings.passwordWarning = "Password can't be less then 5 characters";
    } else {
      newWarnings.passwordWarning = "";
    }
    setUserDataWarnings(newWarnings);

    // checking for the both conditions

    if (Object.values(UserData).every((ele) => ele.length >= 5)) {
      // api call
      Dispatch(LoginCall(UserData, Navigate));
    }
  };
  return (
    <CommanComponent
      heading="Welcome Back, Blogger!"
      subHeading="Nice to see you again"
      text="Log in to access your personal dashboard, manage your posts, and stay connected with your readers."
    >
      <div className="w-full h-full pl-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="mt-8">
          {/* email */}
          <p className="text-base">Email Address</p>
          {/* entering the email */}
          <input
            type="email"
            placeholder="Email Address"
            onChange={HandleInput}
            className="w-11/12 h-9 mt-3 rounded-md outline-none pl-2 bg-white border border-gray-600"
            name="email"
            id=""
          />
          {/* if user enters wrong information (Email) the it will throw an warning */}
          <p className="warning text-red-600 text-sm">
            {UserDataWarnings.emailWarning}
          </p>
        </div>
        <div className="mt-8">
          {/* password */}
          <p className="text-base">Enter Password</p>
          <div className="w-11/12 flex justify-center items-center p-1 mt-3  bg-white px-2 h-9 rounded-md bg-transparent border border-gray-600 ">
            {/* enter the password */}
            <input
              // toggling the password type
              type={showPassword ? "text" : "password"}
              onChange={HandleInput}
              placeholder="Password"
              className=" w-full h-full  outline-none pl-2 bg-transparent"
              name="password"
              id=""
            />
            {/* fucntion to toggle the password type */}
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "hide" : "show"}
            </button>
          </div>
          {/* if user enters wrong information (password) the it will throw an warning */}
          <p className="warning text-red-600 text-sm">
            {UserDataWarnings.passwordWarning}
          </p>
        </div>

        <div className="signupBtns mt-8">
          {/* HandleLogin function for submiting the form */}
          <button
            className="w-11/12 text-white hover:bg-blue-700 h-11 bg-blue-600 rounded-lg shadow-md"
            onClick={HandleLogin}
          >
            Login
          </button>
        </div>

        <p className="warning text-red-600 text-sm">{UserError}</p>
        <span className="">
          {/* navigate the Signup page */}
          Already have an account ?{" "}
          <span
            className="font-bold cursor-pointer hover:text-blue-800"
            onClick={() => Navigate("/signup")}
          >
            Signup
          </span>
        </span>
      </div>
      {
        // loading the loader
        UserLoading && <Loader />
      }
    </CommanComponent>
  );
};
export default Login;
