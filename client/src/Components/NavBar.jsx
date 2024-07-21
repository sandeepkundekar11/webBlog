import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ path ,userId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const Navigate = useNavigate();
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
          className={` p-2 w-24 font-medium ${
            path === "/" && "text-blue-700 rounded-lg bg-blue-200  text-center"
          }`}
        >
          Home
        </NavLink>
        <NavLink
          className={`p-2 w-24 font-medium ${
            path === "/addblog" &&
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
            <img src="" alt="" />
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
