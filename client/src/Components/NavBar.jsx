import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <div className="w-screen h-16 flex justify-between px-2 bg-gray-200 fixed top-0 items-center">
            {/* Logo */}
            <div className="text-2xl font-extrabold text-blue-500">Blogger</div>
            {/* list of navlink */}
            <li className="flex items-center md:w-96 w-60 justify-around">
                <NavLink>Home</NavLink>
                <NavLink>Add Blog</NavLink>
                {/* profile */}
                <div className="flex ">
                    <img className="w-11 h-11 bg-slate-300 rounded-full" src="" alt="" />
                </div>
            </li>
        </div>
    )
}
export default NavBar