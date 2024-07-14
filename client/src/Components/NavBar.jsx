import { NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ path }) => {

  
  const Navigate = useNavigate();
  return (
    <div className="w-screen h-16 flex justify-between px-2 bg-gray-300 shadow-lg z-30 fixed top-0 items-center">
      {/* Logo */}
      <div
        className="text-2xl font-extrabold text-blue-500 cursor-pointer"
        onClick={() => Navigate("/")}
      >
        Blogger
      </div>
      {/* list of navlink */}
      <li className="flex items-center md:w-96 w-60 justify-around">
        <NavLink
          to="/"
          className={`font-medium ${path === "/" && "text-blue-600"}`}
        >
          Home
        </NavLink>
        <NavLink
          className={`font-medium ${path === "/addblog" && "text-blue-600"}`}
          to="/addblog"
        >
          Add Blog
        </NavLink>
        <p
          className="font-medium cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            Navigate("/login");
          }}
        >
          Logout
        </p>
        {/* profile */}
        <div className="flex ">
          <img className="w-11 h-11 bg-slate-300 rounded-full" src="" alt="" />
        </div>
      </li>
    </div>
  );
};
export default NavBar;
