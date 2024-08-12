import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignupCall } from "../../Redux/Actions/UserAction";
import CommanComponent from "../../helperComponents/CommanComponent";
import Loader from "../../helperComponents/Loader";
const SignUp = () => {
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

  // Signup data state
  const [UserData, setUserData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  });

  // signup warnings
  const [UserDataWaring, setUserDataWarning] = useState({
    first_nameWarning: "",
    last_nameWarning: "",
    emailWarning: "",
    passwordWarning: "",
  });

  // setting the UserData value
  const HandleInput = (e) => {
    let { name, value } = e.target;
    setUserData({
      ...UserData,
      [name]: value,
    });
  };

  // show hide password
  const [showpassowrd, setshowPassword] = useState(false);
  const SubmitForm = () => {
    // initializing the demo warning
    let newWarning = {
      first_nameWarning: "",
      last_nameWarning: "",
      emailWarning: "",
      passwordWarning: "",
    };
    // checking first name
    if (UserData.first_name.length < 3) {
      newWarning.first_nameWarning = "Fist name can't be less the 4 characters";
    } else {
      newWarning.first_nameWarning = "";
    }

    // checking last name

    if (UserData.last_name.length < 3) {
      newWarning.last_nameWarning = "last name can't be less then 4 characters";
    } else {
      newWarning.last_nameWarning = "";
    }

    // checking email

    if (UserData.email.length < 6) {
      newWarning.emailWarning = "Email can't be less then 5 characters";
    } else {
      newWarning.emailWarning = "";
    }
    // checking the Password

    if (UserData.password.length <= 5) {
      newWarning.passwordWarning = "Password can't be less then 5 characters";
    } else {
      newWarning.passwordWarning = "";
    }

    // setting new warning to userData warning
    setUserDataWarning(newWarning);

    if (Object.values(UserData).every((ele) => ele.length >= 3)) {
      // call api
      Dispatch(SignupCall(UserData, Navigate));
    }
  };
  return (
    <>
      <CommanComponent
        heading="Get Started with Your Blog"
        subHeading="Nice to see you again"
        text="We're excited to have you join our community of passionate writers and readers. 
            Creating your blog is simple and free. Share your thought"
      >
        <div className="w-full h-full pl-4">
          <h1 className="text-3xl font-bold">Signup</h1>
          <div className="w-full mt-3">
            {/* first name */}
            <p className="text-base">First Name</p>
            {/* entering first name */}
            <input
              type="text"
              onChange={HandleInput}
              name="first_name"
              placeholder="First Name"
              className="w-11/12 h-9 mt-2 rounded-md outline-none pl-2 bg-transparent border border-gray-600"
              id=""
            />
            {/* log the warning when user not enter first name enter invalid first name */}
            <p className="warning text-red-600 text-sm">
              {UserDataWaring.first_nameWarning}
            </p>
          </div>

          <div className="mt-3">
            {/* last name */}
            <p className="text-base">Last Name</p>
            {/* entering last name */}
            <input
              type="text"
              name="last_name"
              onChange={HandleInput}
              placeholder="Last Name"
              className="w-11/12 h-9 mt-2 rounded-md outline-none pl-2 bg-transparent border border-gray-600"
              id=""
            />
            {/* log the warning when user not enter last or enter invalid last name */}
            <p className="warning text-red-600 text-sm">
              {UserDataWaring.last_nameWarning}
            </p>
          </div>

          <div className="mt-3">
            {/* email */}
            <p className="text-base">Email Address</p>
            {/* entering the email */}
            <input
              type="email"
              name="email"
              onChange={HandleInput}
              placeholder="Email Address"
              className="w-11/12 h-9 mt-2 rounded-md outline-none pl-2 bg-transparent border border-gray-600"
              id=""
            />
            {/* log the warning when user not enter email or enter invalid email */}
            <p className="warning text-red-600 text-sm">
              {UserDataWaring.emailWarning}
            </p>
          </div>
          <div className="mt-3">
            {/* password */}
            <p className="text-base">Enter Password</p>
            <div className="w-11/12 flex justify-center items-center p-1  bg-white px-2 h-9 rounded-md bg-transparent border border-gray-600 ">
              {/* entering the password and show hiding the type of the password after clicking on show hide button */}
              <input
                name="password"
                onChange={HandleInput}
                type={showpassowrd ? "text" : "password"}
                placeholder="Password"
                className=" w-full h-full  outline-none pl-2 bg-transparent"
                id=""
              />
              <button onClick={() => setshowPassword(!showpassowrd)}>
                {showpassowrd ? "hide" : "show"}
              </button>
            </div>
            {/* if user user enter wrong or invalid password then log the warning */}
            <p className="warning text-red-600 text-sm">
              {UserDataWaring.passwordWarning}
            </p>
          </div>

          <div className="signupBtns mt-4">
            {/* submit button */}
            <button
              className="w-11/12 text-white hover:bg-blue-700 h-11 bg-blue-600 rounded-lg shadow-md"
              onClick={SubmitForm}
            >
              SignUp
            </button>
            <p className="warning text-red-600 text-sm">{UserError}</p>
          </div>

          <span>
            Don't have an account ?{" "}
            <span
              className="font-bold cursor-pointer hover:text-blue-800"
              onClick={() => Navigate("/login")}
            >
              {" "}
              Login
            </span>
          </span>
        </div>
      </CommanComponent>
      {UserLoading && <Loader />}
    </>
  );
};
export default SignUp;
