import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import UserLogic from "../Logic/UserLogic";
import { GetUserInfoApiCall } from "../Redux/Actions/UserProfileAction";

const NavBar = ({ path, userId }) => {
  const Dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false);
  const { GetIframeColor, GetUserIcon } = UserLogic()
  const Navigate = useNavigate();
  // state to store the userIframe when user src is not available
  const [UserIframe, setUserIframe] = useState()
  //  state to store the user profile color
  const [ProfileColor, setProfileColor] = useState()

  // getting user data
  const { ProfileData } = useSelector((state) => state.UserInfo)

  // calling  the getuser api
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("user"))?._id
    // calling the get profile api
    Dispatch(GetUserInfoApiCall(userId));
  }, [Dispatch]);

  // setting the user iframe and profile color
  useEffect(() => {
    let name = `${ProfileData?.first_name} ${ProfileData?.last_name}`
    // iframe
    setUserIframe(GetUserIcon(name))
    // color
    setProfileColor(GetIframeColor(name[0]))
  }, [ProfileData])
  return (
    <div className="w-screen h-16 flex justify-between px-2 bg-white shadow-lg z-30 fixed top-0 items-center">
      {/* Logo */}
      <div
        className="text-2xl font-extrabold text-blue-500 cursor-pointer"
        onClick={() => Navigate("/")}
      >
        Blogger
      </div>
      {/* list of navlink */}
      <li className="flex items-center md:w-96 w-60 justify-evenly">
        <NavLink
          to="/"
          className={` p-2 w-24 font-medium ${path === "/" && "text-blue-700 rounded-lg bg-blue-200  text-center"
            }`}
        >
          Home
        </NavLink>
        <NavLink
          className={`p-2 w-24 font-medium ${path === "/addblog" &&
            "text-blue-700 rounded-lg bg-blue-200  text-center"
            }`}
          to="/addblog"
        >
          Add Blog
        </NavLink>

        {/* profile */}
        <div
          className="flex relative"
          onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
        >
          <button
            className="w-11 h-11 bg-slate-300 rounded-full"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            {
              ProfileData?.profileSrc ? <img className="w-full h-full rounded-full" src={ProfileData?.profileSrc} alt="" /> :
                <div style={{ backgroundColor: ProfileColor }} className="w-full h-full rounded-full flex justify-center items-center font-bold capitalize">
                  {UserIframe}
                </div>
            }

          </button>

          {showDropdown && (
            <ul className="profileDropdown w-24 h-20 bg-white z-30 absolute top-12 right-0 rounded-md shadow-2xl ">
              <p
                className="font-medium cursor-pointer h-10 py-2 px-2 hover:bg-blue-300 rounded-md"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  Navigate("/login");
                }}
              >
                Logout
              </p>

              <p
                className="font-medium cursor-pointer h-10 hover:bg-blue-300  py-2 px-2 rounded-md"
                onClick={() => {
                  Navigate(`/profile/${userId}`);
                }}
              >
                Profile
              </p>
            </ul>
          )}
        </div>
      </li>
    </div>
  );
};
export default NavBar;
